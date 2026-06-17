# Architecture Context

- updated_at: 2026-06-17
- release_stage: phase_5_release_verified
- status: verified_final_release
- framework: Astro
- validation:
  - basis: final release verification snapshot on 2026-06-17; entries below record the released implementation and the completed verification set
  - npm_run_lint: PASS
  - npm_run_build: PASS
  - route_checks: PASS
  - widgets_like_button: PASS
  - bgm_html_exclusions: PASS
  - reduced_motion_search_focus_stale_sweep: PASS
  - git_diff_check_allowed_docs: PASS
  - npm_run_check_images_allow_placeholders: PASS
  - node_check_scripts_mjs: PASS
  - route_link_scan: PASS
  - pagefind_artifact_check: PASS
  - forbidden_ghchart_rshah_scan: PASS
  - final_gate: [ALL_TESTS_PASSED]
- git_metadata: available; verified `git rev-parse --short HEAD` = `0c8a3a2` on 2026-06-17; working tree has unrelated local modifications

## Release Notes

- phase4_widgets: BackToTop, cookie consent, pointer effects, doodle board, like button, and reading-position persistence are implemented and verified
- demo_collections: phase 4/5 demo content collections and module route surfaces are present for the release
- docs_sync: README.md, HANDOFF.md, and ARCHITECTURE_CONTEXT.md are synchronized to the released state
- reduced_motion_background_fix: `SharedBackground` respects reduced-motion behavior while preserving the poster fallback and theme-matched video ownership
- search_modal_focus_trap: `SearchModal` focus management is verified for keyboard navigation and modal dismissal
- bgm_gating_provenance: BGM defaults remain gated; provenance-aware rendering keeps unverified tracks disabled by default
- cache_cleanup: client-side swap cleanup removes stale widget state across navigation

## Current Architecture

- homepage_surface: translucent dashboard content implemented in `src/components/home/HomeDashboard.astro` and mounted from `src/pages/index.astro`; it is not the current owner of homepage audio/video background assets
- shared_background_video: `src/components/layout/SharedBackground.astro`, mounted by `src/layouts/BaseLayout.astro`, owns the global light/dark video background and poster layer using `/images/backgrounds/tomori-light.mp4`, `/images/backgrounds/tomori-dark.mp4`, `/images/backgrounds/tomori-light-poster.webp`, and `/images/backgrounds/tomori-dark-poster.webp`
- legacy_homepage_background_video_2026_06_15: earlier HomeDashboard-owned background video notes are superseded by the global `SharedBackground` layer; do not treat HomeDashboard as the current audio/video owner
- shared_background_video_validation_2026_06_15: historical verification passed with `npm run build` and `npm run lint`; current retry branch reruns `npm run build` after docs/copy sync
- shared_background_poster_release_2026_06_15: `src/components/layout/SharedBackground.astro` now renders a poster layer ahead of the shared video background, keeps light/dark poster and video sources synchronized, retains the poster on video error, and fades the video in after `loadeddata`/`canplay`
- shared_background_poster_assets_2026_06_15: new poster assets were added at `public/images/backgrounds/tomori-light-poster.webp` and `public/images/backgrounds/tomori-dark-poster.webp`
- shared_background_poster_validation_2026_06_15: verified by `npm run build` PASS; existing build warnings remain limited to optional content dirs/empty collections and the Vite chunk size notice
- site_identity: canonical Chinese site title is now `奈奈奈奈奈绪の博客`; legacy title `星之回廊` no longer appears in `src`, `public`, or `dist`
- site_identity_placeholder_sync: `src/data/site.ts` and `public/images/placeholders/og-default.placeholder.svg` now share the same Chinese site title
- site_identity_validation: replacement verified historically by `npm run build` PASS and `npm run lint` PASS; final release gate remains pending in the current pre-release verification state
- header_navigation_release_2026_06_13: `src/components/layout/Header.astro` now renders a transparent frosted-glass header; the desktop nav starts slightly left of center; the visible nav set is 首页 / 项目 / 归档 / 照片墙 / 音乐 / 灵感 / 说说 / 杂谈 / 友链 / 关于; search, theme toggle, and zh/en switcher are no longer placed in the Header
- header_navigation_alignment_release_2026_06_13: `src/components/layout/Header.astro` adjusted desktop left padding from `lg:pl-[34vw] xl:pl-[40vw] 2xl:pl-[43vw]` to `lg:pl-[32vw] xl:pl-[38vw] 2xl:pl-[41vw]` so `奈奈奈奈奈绪の博客` sits slightly farther left and reads more symmetrically against the right-side navigation
- header_navigation_alignment_validation_2026_06_13: verified no stale offset classes remain, no search/theme/language/color controls remain in `Header`, the nav and site title render normally, and `npm run lint` PASS; `npm run build` was intentionally not run for this single-class layout adjustment
- site_identity_release_2026_06_13: `src/data/site.ts` now uses the canonical site title `奈奈奈奈奈绪の博客`; the prior title `奈奈奈奈奈の博客` was synchronized out of the release surface
- homepage_navigation_release_2026_06_13: `src/components/home/HomeDashboard.astro`, `src/layouts/BaseLayout.astro`, `src/pages/index.astro`, and `src/styles/global.css` were updated so the home page keeps a single-viewport dashboard concept with `hideFooter`/`noContainer`; current source uses `height: 100svh`, `margin-top: -3rem`, and `overflow-y: auto`
- homepage_navigation_validation_2026_06_13: verification passed with `npm run lint` and `npm run build`; build emitted only known non-blocking warnings for missing content directories, large chunks, and Pagefind Chinese stemming/body index notices
- homepage_reference_sync_2026_06_13: `src/components/home/HomeDashboard.astro` follows the XinghuisamaBlogs-inspired dashboard layout with transparent glass panels over the shared background and a latest-moments feed; homepage-local audio/video ownership and audio controls are not current behavior
- header_reference_sync_2026_06_13: `src/components/layout/Header.astro` now uses a transparent glass pill desktop nav plus a mobile menu over existing local routes from `src/data/nav.ts`
- audio_asset_release_2026_06_13: `public/audio/bgm/Departures.mp3` exists as a user-provided/replacement-required asset; current source marks the Departures track disabled and unverified
- homepage_reference_validation_2026_06_13: historical verification passed for `node v24.15.0 >=20`, `npm run lint`, and `npm run build`; later safety updates removed homepage audio exposure from the current UI
- homepage_theme_surface_release_2026_06_13: `src/components/layout/Header.astro` now uses day/night frosted-glass styling with light mode `bg-white/70 text-slate-950 backdrop-blur-xl` and dark mode `dark:bg-slate-950/60 dark:text-white`; header controls remain limited to navigation and mobile menu
- homepage_background_theme_release_2026_06_13: legacy HomeDashboard theme-background switching was superseded by `SharedBackground`; HomeDashboard now keeps text/panel tokens readable in both themes
- homepage_theme_surface_mode_switch_2026_06_13: header and home glass surfaces now switch strictly by `html[data-theme]`; light mode uses white glass with dark text, and dark mode uses black glass with light text
- shared_background_theme_video_switch_2026_06_13: global background now switches by theme in `SharedBackground`; light uses `/images/backgrounds/tomori-light.mp4`, dark uses `/images/backgrounds/tomori-dark.mp4`, and matching poster assets render before video readiness
- shared_background_video_loading_fix_2026_06_13: `src/components/layout/SharedBackground.astro` renders one unsourced persisted video, attaches only the active theme source, and respects reduced-motion by avoiding autoplay/source attachment
- shared_background_theme_verification_2026_06_13: historical verification passed for `npm run lint`, `npm run build`, `git diff --check`, and source/dist background checks; build warnings remain non-blocking
- global_background_layer_release_2026_06_13: `src/layouts/BaseLayout.astro` mounts a shared fixed video background layer for all pages, and `src/components/home/HomeDashboard.astro` does not carry a homepage-only full-screen background to avoid double loading
- global_background_layer_css_2026_06_13: `src/styles/global.css` now keeps fixed background layers behind content while preserving the existing fallback backgrounds
- global_background_layer_validation_2026_06_13: verification passed for `npm run lint`, `npm run build`, static HTML assertions on representative zh/en routes, preview route checks, preview MP4 checks, pointer-events:none on background layers, non-home scroll lock unchanged, and guarded Astro client navigation listener behavior
- en_home_hidefooter_release_2026_06_13: `src/pages/en/index.astro` now passes `hideFooter` to `BaseLayout`, keeping the English home page single-screen
- homepage_theme_validation_2026_06_13: independent verification passed with `npm run lint` PASS and `npm run build` PASS; header no longer exposes search/theme/language/color controls, both Chinese and English home pages remain single-screen, and build warnings stayed non-blocking
- post_surface: `src/layouts/PostLayout.astro` now includes TOC scrollspy, KaTeX CSS support, Mermaid lazy render, reading progress, and series sidebar support
- embed_surface: `src/components/embed/EmbedFrame.astro` centralizes iframe normalization and sandbox hardening; Bilibili, YouTube, and CodePen wrappers reuse it
- header_surface: `src/components/layout/Header.astro` rebinds event handlers on `astro:page-load` for Astro ClientRouter compatibility
- tooling_surface: ESLint 9 flat config is active in `eslint.config.mjs`
- content_surface: demo/article showcase content exists for Phase 3 validation
- release_handoff_completion_2026_06_13: unfinished HANDOFF/README work was completed for module pages, English route wrappers, Pagefind search modal, guarded Giscus comments/guestbook, helper scripts, and CI/deploy workflows
- release_handoff_interface_2026_06_13: module pages now include zh/en routes for about, archives, categories, friends, gallery, moments, projects, tags, tracking, privacy, guestbook, and post indexes; English wrappers mirror the Chinese route surface
- release_handoff_search_comments_2026_06_13: the home dashboard now opens a Pagefind-backed search modal, and post/guestbook comment entry points are guarded through the shared Comments component
- release_handoff_tooling_2026_06_13: new scripts cover image checks/compression, font subsetting, and content scaffolding; CI/deploy workflows now run lint/build and publish the site artifact through GitHub Pages
- release_handoff_validation_2026_06_13: verification passed for `npm run lint`, `npm run build`, `npm run check:images -- --allow-placeholders`, `node --check scripts/*.mjs`, `git diff --check`, route/link scan, pagefind artifact check, and forbidden `ghchart`/`rshah` scan
- docs_status_sync_2026_06_16: README.md and HANDOFF.md were updated to distinguish implemented features from remaining user-private TODOs and implementation gaps; package scripts and workflows were reviewed with no changes needed
- docs_status_sync_validation_2026_06_16: `npm run build` PASS; build generated 60 pages and Pagefind indexed 60 pages; remaining warnings were the existing large chunk notice and Pagefind zh stemming/body-index notes
- docs_stale_state_retry_2026_06_17: README.md and HANDOFF.md were resynced after safety review so BackToTop, likes, Cookie consent, pointer effects, reading position, BGM widget cleanup, and Header mobile focus trap are documented as implemented; remaining BGM provenance is tracked as user-provided license/source configuration or replacement/removal of the default track
- homepage_audio_safety_retry_2026_06_17: `src/components/home/HomeDashboard.astro` no longer renders homepage audio markup, play controls, or references to the unverified BGM track; `public/audio/bgm/Departures.mp3` remains only as a user-provided/replacement-required asset and is not exposed by UI by default
- docs_tooling_truth_retry_2026_06_17: README.md and HANDOFF.md now document the current control surface: Header has navigation/mobile menu only; HomeDashboard exposes light/dark/auto theme buttons plus brand preset swatches; no custom color picker or Header language/theme/color controls are implemented. SiteWidgets renders BGM only when a track is enabled, verified, and provenance-backed; current Departures is disabled/unverified.
- consent_docs_sync_retry_2026_06_17: SiteWidgets consent copy now states only local preference storage in browser localStorage, click-loaded comments when configured, lazy loading behavior for embedded media near viewport, and third-party provider request handling under provider policies. README/HANDOFF/ARCHITECTURE_CONTEXT now describe `SharedBackground` as the global light/dark video+poster owner and `HomeDashboard` as dashboard content only; legacy HeroSection random/typewriter behavior is not mounted.
- consent_docs_sync_validation_2026_06_17: `git diff --check -- README.md HANDOFF.md ARCHITECTURE_CONTEXT.md src/content/posts/zh/astro-fullscreen-hero.md src/components/widgets/SiteWidgets.astro` PASS for tracked docs/content; the earlier standalone Pagefind issue after Astro generated 60 pages is historical, and later branch-local validation recorded `npm run lint` PASS and `npm run build` PASS.
- docs_context_final_release_2026_06_17: HANDOFF key-file labels now call the zh/en home pages single-screen dashboard routes mounted through `HomeDashboard`; ARCHITECTURE_CONTEXT reflects the verified final release gate and no longer describes the state as pre-release or in-verification.
- docs_context_final_release_validation_2026_06_17: final validation recorded `npm run lint` PASS, `npm run build` PASS, route checks PASS, widgets/like button PASS, BGM HTML exclusions PASS, reduced-motion/search focus/stale sweep PASS, and `git diff --check -- ARCHITECTURE_CONTEXT.md HANDOFF.md README.md` PASS.

## Residual Warnings

- comment_system: guarded Giscus lazy-loading entry points exist for posts and guestbook; real `repoId`, `categoryId`, and `guestbookCategoryId` still require user-provided GitHub Discussions configuration
- site_search: Pagefind-backed `SearchModal` exists and is mounted from the home dashboard; search quality depends on generated Pagefind artifacts from `npm run build`
- content_dirs: some content collection directories remain empty or missing until content is added
- pagefind_warning: large chunks and Pagefind zh stemming warnings remain non-blocking
- homepage_theme_warning_2026_06_13: build still emits existing nonfatal content collection and large chunk warnings
- image_placeholders: placeholder markers remain allowed by policy for now
- audio_provenance: `public/audio/bgm/Departures.mp3` provenance/license is not documented yet; the asset is retained as user-provided/replacement-required material and is not exposed by the homepage or default UI until source/license verification or replacement is complete
- external_integrations: real Giscus, social, email, and private asset values still require user-provided configuration
- shared_background_video_warnings: non-blocking warnings observed for missing content directories, large chunks over 500k, and Pagefind Chinese stemming/body index notices
- generated_artifacts: `dist/` is present locally but is not the source of truth
- git_status: git metadata is available in this workspace; `git status --short` shows a dirty tree with unrelated local modifications, so retry branches must avoid reverting others' edits
