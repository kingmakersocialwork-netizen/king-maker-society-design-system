---
name: king-maker-society-design
description: Use this skill to generate well-branded interfaces and assets for King Maker Society, either for production or throwaway prototypes/mocks/etc. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping a dark, gold-accented combat-sports/self-improvement brotherhood brand.
user-invocable: true
---

Read the `readme.md` file within this skill, and explore the other available files.

If creating visual artifacts (slides, mocks, throwaway prototypes, etc), copy assets out and
create static HTML files for the user to view. If working on production code, you can copy assets
and read the rules here to become an expert in designing with this brand.

Key facts to anchor on:
- **Brand:** King Maker Society (three words, never "Kingmaker"). Tagline: *Kings Are Made, Not Born.*
- **Feel:** dark, gold, masculine, aspirational — high-end fight gym meets brotherhood of kings.
- **Always dark backgrounds.** Gold (`#C9A84C`) only on dark. Red (`#C0341A`) for action only. No blue, no purple, no decorative gradients.
- **Type:** Bebas Neue (display, UPPERCASE), Barlow Condensed (labels/nav/buttons, UPPERCASE + wide tracking), Barlow 300 (body).
- **Sharp corners** (4–6px max), never pill buttons. Cards = charcoal `#1A1510` + 18%-gold border.
- **Voice:** short, direct, human. Second person. No corporate language, no guarantees. Calls are "Master Classes."

Files of note:
- `styles.css` — import this one file to get all tokens + fonts.
- `tokens/` — colors, typography, spacing/radii/shadows/motion.
- `components/` — React primitives (Button, Badge, Eyebrow, Avatar, Card, PricingCard, FaqItem).
- `ui_kits/landing/` — the full landing page (HTML/CSS/vanilla JS) to crib from.
- `assets/` — crown logo + leadership photos.

If the user invokes this skill without any other guidance, ask them what they want to build or
design, ask a few focused questions, and act as an expert designer who outputs HTML artifacts
or production code, depending on the need.
