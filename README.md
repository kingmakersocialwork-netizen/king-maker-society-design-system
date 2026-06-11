# Landing Page — UI Kit

The full single-page marketing site for **King Maker Society**: a dark, gold-accented
luxury landing page for the online self-improvement brotherhood for martial artists.

## Files
- `index.html` — the complete page (12 sections + referral modal). Self-contained; links the
  design-system tokens (`../../styles.css`) plus `landing.css` and `landing.js`.
- `landing.css` — page styles, built entirely on the design tokens.
- `landing.js` — vanilla interactions (no frameworks).

- `kings_media.html` / `brotherhood.html` — branded "coming soon" stub pages for the nav links
  (full builds pending separate prompts).
- `index-v1.html` — archived first version (kept for reference; not registered).

## Sections (in scroll order)
1. Fixed nav (blur, opaque on scroll, IG link) · 2. Hero (canvas gold particles w/ depth + glow
sprite — 420 desktop / off on mobile, god-rays, ground glow, Tue/Fri 2PM-CST countdown, animated
member counter, "100% Commitment" stat) · 3. What You Get (6 pillars + emoji icons + Hall of Fame) ·
4. Founder Video (YouTube thumbnail + gold play button) · 5. Team (3 bios, colored-initial avatars,
shimmer top border) · 6. Accountability System (Mon/Fri/Sun, giant day watermark) · 7. Origin Story ·
8. Pricing (Basic + VIO featured-shimmer; Elite noted "coming soon") · 9. Upcoming Master Classes
(Tue/Fri) · 10. Free-Trial banner (BROTHERHOOD watermark + bullets) · 11. Podcast (YouTube card) ·
12. FAQ accordion · 13. Footer (social pills) · + Referral / Privacy / Terms modals.

## Interactions
Depth-of-field canvas particles with glow sprite + soft trails (off on <768px and reduced-motion),
live Tuesday/Friday 2PM-CST countdown with blinking separators, IntersectionObserver scroll-reveal
+ member counter ease-out cubic (0→150), FAQ accordion (rotating chevron), three modals (referral /
privacy / terms — open on Join / team-name / legal-link click, close on backdrop / ✕ / Esc), nav
opacity on scroll.

## Notes
- All real links wired (Calendly, Google Form trial, Stripe checkout, YouTube, socials).
- This redesign uses **emoji glyph icons** in the pillar/feature cards and Hall-of-Fame medals,
  per the redesign brief (an intentional override of the system's default "no emoji" stance for
  this page). Team avatars are colored-initial monograms (no photos), per brief.
- The page is the canonical product surface — treat it as the source of truth.
