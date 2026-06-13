/**
 * 主题与主色工具（运行在浏览器端）
 * 仅在 <script is:inline> 中调用，不依赖 React/Astro 框架
 */

export type ThemeMode = "light" | "dark" | "auto";

const THEME_KEY = "blog:theme";
const COLOR_KEY = "blog:brand-color";

/** 将 HEX 转为 RGB 三元组字符串（"124 58 237"），供 CSS 变量使用 */
export function hexToRgbTriplet(hex: string): string {
  const v = hex.replace("#", "");
  const r = parseInt(v.slice(0, 2), 16);
  const g = parseInt(v.slice(2, 4), 16);
  const b = parseInt(v.slice(4, 6), 16);
  return `${r} ${g} ${b}`;
}

/** 用 HSL 调整明度生成色阶 */
export function generateScale(hex: string): Record<string, string> {
  const v = hex.replace("#", "");
  const r = parseInt(v.slice(0, 2), 16) / 255;
  const g = parseInt(v.slice(2, 4), 16) / 255;
  const b = parseInt(v.slice(4, 6), 16) / 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  const l = (max + min) / 2;
  const s =
    max === min ? 0 : (max - min) / (l > 0.5 ? 2 - max - min : max + min);
  if (max !== min) {
    if (max === r) h = (g - b) / (max - min) + (g < b ? 6 : 0);
    else if (max === g) h = (b - r) / (max - min) + 2;
    else h = (r - g) / (max - min) + 4;
    h /= 6;
  }
  const stops: Record<string, number> = {
    50: 0.97,
    100: 0.93,
    200: 0.86,
    300: 0.74,
    400: 0.62,
    500: 0.55,
    600: 0.46,
    700: 0.36,
    800: 0.27,
    900: 0.18,
  };
  const out: Record<string, string> = {};
  for (const [k, targetL] of Object.entries(stops)) {
    const [rr, gg, bb] = hslToRgb(h, s, targetL);
    out[k] = `${rr} ${gg} ${bb}`;
  }
  return out;
}

function hslToRgb(h: number, s: number, l: number): [number, number, number] {
  let r = 0,
    g = 0,
    b = 0;
  if (s === 0) {
    r = g = b = l;
  } else {
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }
  return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}

/** 应用主色（写入 CSS 变量）*/
export function applyBrandColor(hex: string): void {
  const root = document.documentElement;
  root.style.setProperty("--color-brand", hexToRgbTriplet(hex));
  const scale = generateScale(hex);
  for (const [k, v] of Object.entries(scale)) {
    root.style.setProperty(`--color-brand-${k}`, v);
  }
  try {
    localStorage.setItem(COLOR_KEY, hex);
  } catch {}
}

/** 应用主题模式 */
export function applyTheme(mode: ThemeMode): void {
  const root = document.documentElement;
  const resolved =
    mode === "auto"
      ? window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light"
      : mode;
  root.setAttribute("data-theme", resolved);
  try {
    localStorage.setItem(THEME_KEY, mode);
  } catch {}
}

/** 初始化（在 <head> 内联脚本中尽早调用，避免闪烁）*/
export function bootstrapTheme(defaultBrand: string): void {
  try {
    const saved = localStorage.getItem(THEME_KEY) as ThemeMode | null;
    applyTheme(saved ?? "auto");
  } catch {
    applyTheme("auto");
  }
  try {
    const savedColor = localStorage.getItem(COLOR_KEY);
    applyBrandColor(savedColor ?? defaultBrand);
  } catch {
    applyBrandColor(defaultBrand);
  }
}

export const STORAGE_KEYS = { THEME_KEY, COLOR_KEY };
