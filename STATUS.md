# Thai Dai — Project Status

_Last updated: 2026-11-02_

## Overview

Thai Dai is a static (GitHub Pages) Thai language-learning web app with two learning tracks:

- **Speak & Read** — full course with Thai script and multiple-choice exercises.
- **Speak Only** — audio-first track (no Thai script) for street-survival phrases.

| | |
|---|---|
| **Repo** | github.com/YaronBaDa/thai-dai |
| **Live** | https://yaronbada.github.io/thai-dai/ |
| **Pages** | `index.html` (landing) · `onboarding.html` (setup wizard) · `learn.html` (study screen) |
| **Stack** | Vanilla HTML/CSS/JS, single files, Lucide icons (CDN), no build step |

## Design System — "Siam Clay & Botanicals"

- **Canvas/linen** `#F5EFEB` · **cards** `#FAF7F2` · **inset wells** `#EFE8DF`
- **Text:** deep forest `#1C332A` · taupe `#6F665C` · muted `#9B9185`
- **Accents:** terracotta `#D36248` · amber `#D88941` · sage `#4E6E5D`
- **CTA:** forest `#1C332A` on cream `#FAF7F2`
- **Fonts:** IBM Plex Sans Thai Looped (body, EN + TH) · Fraunces (headings)
- **Icons:** Lucide (unpinned CDN)
- Radius scale: 20px cards/buttons · 14px fields/stats · pill tags/progress · circle avatars/nodes

## Page status

| Page | Rebrand | State |
|---|---|---|
| `index.html` | ✅ | Landing page on Siam Clay tokens + fonts. |
| `onboarding.html` | ✅ | Emojis restored, compact cards, step counter, centered. ⚠️ still emerald accent. |
| `learn.html` | ✅ | Path redesigned (centered timeline, editorial unit cards, terracotta active node + halo, dashed connectors, segmented track switcher). |

## Lesson engine (`session-runner.js`)

Step types:
- **presentation** — input/shadowing, **never scored**
- **tone_discrimination** — listen → identify pitch contour
- **scrambled_syllable** — reconstruct phrase from shuffled blocks
- **contextual_match** — scenario + pragmatic options

Scoring: `correct / scored`, where only question steps count.

| Track | Engine |
|---|---|
| Speak & Read | Lesson 1 ("The Golden Words") → step engine (curated, Thai script + contextual match). Lessons 2–13 still old multiple-choice. |
| Speak Only | All 6 curriculum lessons auto-converted to **presentation → tone → scrambled** (32 active steps). Tone Lab + Street Scenarios keep their existing active cards. |

## Open items / decisions

1. **Accent color unification** — onboarding still uses emerald green; `index` + `learn` use terracotta. Pick one: terracotta (canonical) / emerald / royal purple.
2. **Audio** — all speech is browser TTS (`speechSynthesis`, `th-TH`). `lesson-1.json` carries `audioUrl` placeholders; real recordings + `onerror` handlers are pending.
3. **Lucide CDN** — icons load from `unpkg@latest`; consider self-hosting for reliability.
4. **Read-mode lessons 2–13** — still the old recognition engine; only lesson 1 migrated.
5. **Vision** — screenshot analysis is disabled (no vision provider configured). Run `hermes setup` / add `GOOGLE_API_KEY` or `OPENROUTER_API_KEY` to enable.
6. **Speak-only contextual_match** — auto-conversion produces presentation/tone/scrambled but no contextual step (no scenario data in curriculum).

## Recent work (this session)

- Rebranded all three pages to Siam Clay tokens + typography (dropped Duolingo greens, flattened 3D shadows).
- Onboarding: restored emojis, compact horizontal cards, "Step X of 8" counter with dots.
- Path screen: unified centered axis, editorial unit cards, terracotta active node + pulsing halo, dashed connectors, compact segmented track switcher.
- Built the step-based lesson engine with score filtering.
- Migrated all Speak-Only lessons to the active engine.
- QA fixes: raw `<i data-lucide>` markup text, missing `createIcons()` on load, `100dvh` viewport, 48px touch targets, session persistence in `sessionStorage`.
