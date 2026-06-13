# Architecture Context

- updated_at: 2026-06-13
- release_stage: phase_5_release_logging
- status: verified
- framework: Astro
- validation:
  - npm_run_lint: PASS
  - npm_run_build: PASS
  - final_gate: "[ALL_TESTS_PASSED]"
- git_metadata: unavailable_in_workspace_view

## Current Architecture

- homepage_surface: translucent dashboard implemented in `src/components/home/HomeDashboard.astro` and mounted from `src/pages/index.astro`
- homepage_background_video: `src/components/home/HomeDashboard.astro` now supports a video-backed hero background using `public/images/backgrounds/友利奈绪动态壁纸.mp4`; the built asset is present at `dist/images/backgrounds/友利奈绪动态壁纸.mp4`
- homepage_background_video_validation: verified by `npm run build` and `npm run lint` with final gate `[ALL_TESTS_PASSED]`
- site_identity: canonical Chinese site title is now `奈奈奈奈奈绪の博客`; legacy title `星之回廊` no longer appears in `src`, `public`, or `dist`
- site_identity_placeholder_sync: `src/data/site.ts` and `public/images/placeholders/og-default.placeholder.svg` now share the same Chinese site title
- site_identity_validation: replacement verified by `npm run build` PASS and `npm run lint` PASS with final gate `[ALL_TESTS_PASSED]`
- header_navigation_release_2026_06_13: `src/components/layout/Header.astro` now renders a transparent frosted-glass header; the desktop nav starts slightly left of center; the visible nav set is 首页 / 项目 / 归档 / 照片墙 / 音乐 / 灵感 / 说说 / 杂谈 / 友链 / 关于; search, theme toggle, and zh/en switcher are no longer placed in the Header
- header_navigation_alignment_release_2026_06_13: `src/components/layout/Header.astro` adjusted desktop left padding from `lg:pl-[34vw] xl:pl-[40vw] 2xl:pl-[43vw]` to `lg:pl-[32vw] xl:pl-[38vw] 2xl:pl-[41vw]` so `奈奈奈奈奈绪の博客` sits slightly farther left and reads more symmetrically against the right-side navigation
- header_navigation_alignment_validation_2026_06_13: verified no stale offset classes remain, no search/theme/language/color controls remain in `Header`, the nav and site title render normally, and `npm run lint` PASS; `npm run build` was intentionally not run for this single-class layout adjustment
- site_identity_release_2026_06_13: `src/data/site.ts` now uses the canonical site title `奈奈奈奈奈绪の博客`; the prior title `奈奈奈奈奈の博客` was synchronized out of the release surface
- homepage_navigation_release_2026_06_13: `src/components/home/HomeDashboard.astro`, `src/layouts/BaseLayout.astro`, `src/pages/index.astro`, and `src/styles/global.css` were updated so the home page is locked to a single viewport without vertical scrolling and the profile avatar block was removed from the dashboard hero
- homepage_navigation_validation_2026_06_13: verification passed with `npm run lint` and `npm run build`; build emitted only known non-blocking warnings for missing content directories, large chunks, and Pagefind Chinese stemming/body index notices
- homepage_theme_surface_release_2026_06_13: `src/components/layout/Header.astro` now uses day/night frosted-glass styling with light mode `bg-white/70 text-slate-950 backdrop-blur-xl` and dark mode `dark:bg-slate-950/60 dark:text-white`; header controls remain limited to navigation and mobile menu
- homepage_background_theme_release_2026_06_13: `src/components/home/HomeDashboard.astro` now switches the home background by theme, using a day-mode placeholder surface and the existing video background in dark mode via `html[data-theme="dark"]`; the home text/panel tokens were adjusted to keep contrast readable in both themes
- en_home_hidefooter_release_2026_06_13: `src/pages/en/index.astro` now passes `hideFooter` to `BaseLayout`, keeping the English home page single-screen
- homepage_theme_validation_2026_06_13: independent verification passed with `npm run lint` PASS and `npm run build` PASS; header no longer exposes search/theme/language/color controls, both Chinese and English home pages remain single-screen, and build warnings stayed non-blocking
- post_surface: `src/layouts/PostLayout.astro` now includes TOC scrollspy, KaTeX CSS support, Mermaid lazy render, reading progress, and series sidebar support
- embed_surface: `src/components/embed/EmbedFrame.astro` centralizes iframe normalization and sandbox hardening; Bilibili, YouTube, and CodePen wrappers reuse it
- header_surface: `src/components/layout/Header.astro` rebinds event handlers on `astro:page-load` for Astro ClientRouter compatibility
- tooling_surface: ESLint 9 flat config is active in `eslint.config.mjs`
- content_surface: demo/article showcase content exists for Phase 3 validation

## Residual Warnings

- comment_system: still placeholder-only, planned for later Phase 6 integration
- site_search: search UI remains placeholder-only, planned for later Phase 6 integration
- homepage_background_video_warnings: non-blocking warnings observed for missing content directories, large chunks over 500k, and Pagefind Chinese stemming/body index notices
- generated_artifacts: `dist/` is present locally but is not the source of truth
- git_status: commit and status output could not be produced from this workspace because git metadata was not available
