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
- site_identity: canonical Chinese site title is now `奈奈奈奈奈绪の博客`; legacy title `星之回廊` no longer appears in `src` or `public`
- site_identity_placeholder_sync: `src/data/site.ts` and `public/images/placeholders/og-default.placeholder.svg` now share the same Chinese site title
- site_identity_validation: replacement verified by `npm run build` PASS and `npm run lint` PASS with final gate `[ALL_TESTS_PASSED]`
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
