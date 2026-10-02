# START HERE (handoff, updated 2026-10-01, evening)

## State
- New site lives on branch `redesign` → PR mohamedazizbenhaha/mohamedazizbenhaha.github.io#1.
- **Live review URL (the user opens it on their phone):** https://deploy-preview-1--mohamedazizbenhaha.netlify.app
  Every push to `redesign` rebuilds it in ~1 min. Production (`main` → mohamedazizbenhaha.netlify.app) is untouched until merge; merging needs the user's word.
- Files: `index.html` (markup + English copy) · `style.css` · `main.js` (French copy in `FR`, experience data in `EXP`, interactions) · `res/` assets. Facts: `content.md`. Product brief: `PRODUCT.md`.

## Workflow each round
1. Edit. Find code with Grep, read by line range.
2. `python scripts/run_gates.py` (secrets + broken links) and `node --check main.js`.
3. Check once in the Browser pane: `preview_start resume` (:8770), desktop 1440 and mobile 375. One batched round, fix, at most one more look.
4. Commit and `git push origin redesign` without asking, then send the user the live URL.

## Skills (project `.claude/skills/`)
Use only where they earn their tokens:
- `redesign-skill`: audit-then-fix pass on the existing page. Good for item-by-item fixes.
- `web-design-guidelines`: final accessibility/UX audit, `file:line` output. Run once before merge.
- `improve-animations` (audit + plan) / `review-animations` (manual): one motion pass. The page has a lot of motion (network canvas, orbit, marquee, rotator, reveals, counters).
- `impeccable`: use its `detect`/`audit`/`polish` commands only. Do not run its concept-seed or mockup rounds: the user rejected the sketches and the visual world is settled (black + gold #d4a024, Bricolage Grotesque + Manrope).
- `design-taste-frontend`: reference only.
- Rejected 2026-10-01: awesome-design-skills styles (generic tokens that fight our palette), image-to-code (needs image generation), playwright-cli (Browser pane already does this).

## Done 2026-10-01 (tasks 1-7 + guidelines pass, all on `redesign`, not on `main`)
1. About bento is a 12-column grid: rows 1-2 = I build (6, 2 rows) · I teach · I research · 1,000+ hours · I mentor projects (3 each); row 3 = 8 certifications · 9 universities & training centres · Languages (4+4+4). Tablet: 6+6, mobile: 1 column with the two counters side by side. The Écully ↔ Tunis card is gone: location is in the hero status line and the footer.
2. Experience box: `sizeTabs()` in `main.js` renders every group and entry off-screen in the current language and sets `.tabs` `min-height` to the tallest (list + panel when stacked on mobile). Re-runs on resize (debounced), language switch and after fonts load.
3. Education timeline: items centred under evenly spaced dots, column gap 48px, text max 30ch. Mobile keeps the left vertical line.
4. Certifications: no years. Issuer kept for Linux Foundation, Red Hat, Microsoft, Cisco; LPI and AWS cards show the title only.
5. Courses toggle is the original `.read` design (uppercase, 4px tracking, 60px side lines, inline-SVG double chevron rotating 0.3s), gold on hover.
6. Closing band `#contact` (one line + Hire me + both resumes + socials) and a real footer (brand, location, languages, section links, back to top, last updated 10/2026, ©). Update the "last updated" date in `index.html` when content changes.
7. ANETI entry is "ISAM Formation · for ANETI" (FR "pour l'ANETI"); both logos stay in the strip; content.md updated.
- web-design-guidelines pass: skip link, reduced motion now stops marquee/orbit/network canvas/rotator, no `transition:all`, width/height on edu and course images (`img{height:auto}` globally), rotator no longer an aria-live region.

## Round 2 (2026-10-01, the user's feedback)
- Closing band + big footer **removed** (the user hated them: "filling a blank"). Old one-line footer is back. Ideas for a real, working ending are proposed to the user; build only the one they pick.
- About last row is now 25% · 25% · 50%: certifications box lists the 8 codes, institutions box lists the 9 names, languages show three columns (name, level, bar) on wide screens.
- Logo strip stopped because the guidelines pass froze every animation under prefers-reduced-motion (the user's phone has it on). The strip is exempt now (90s loop) and only pauses on hover for real mouse devices. Under reduced motion the typing rotator, network canvas and orbit still stand still: ask the user if they want those back.
- Contact QR now encodes the URL of the .vcf (version 5, was 13) so phones open the file and offer "Create new contact"; `netlify.toml` serves `.vcf` as `text/vcard`. It points at the production domain, so it works after merge; test now with the deploy-preview .vcf URL. A phone that already holds the same number (the user's own) may still offer to merge.

## Round 3 (2026-10-02)
- 1,000+ hours box: "Longest programmes" tags (AI 150 h, DevSecOps 120 h, DevOps 100 h, AWS 100 h) at the top.
- Hero rotator: "build AI systems & cloud infrastructure"; third role is now "design high-availability platforms".
- Footer = logo + © only.
- New `#training` section (nav "Training"/"Formations"): six real programmes as rows (hours · title/outcome/stack · delivered for · Request it mailto). Open: hours for "DevOps from zero" and "Linux & networking".
- Motto block before the footer; wording is a draft the user may replace.
- Nav collapses to the burger below 1180px now (7 links); Hire me button still shows down to 1020px.

## Round 4 (2026-10-02)
- Animations back as before the guidelines pass (caret blink, network canvas, orbit, rotator run even with reduce-motion on; the user's phone has it on and wants motion). Only reveals, name intro, floating badges and two project art loops stop under reduce-motion, as originally.
- "Popular programs" (FR "Programmes phares") label in the 1,000+ hours box.
- Training rows are rendered from `PROGS` in `main.js` (like `EXP`). Click a row → `#progDlg` modal: hours, description, facts, phases (if any), tags, **Download (Word)** if `doc` is set, **Customise** = mailto in a new tab with subject + template body. Only the 130 h AI/ML/AWS programme has a Word file (`res/programmes/AI-ML-AWS-Cloud-130h.docx`, the user's test file, now public). Others say "Detailed syllabus on request" until the user sends their .docx.
- Motto is a full-width photo band (`res/desk.jpg` = the original site's desk photo), then the footer: logo · © … All rights reserved · Legal notice / Privacy / Terms of use (one `#legalDlg`, EN+FR).
- All sections share `--wrap: 1280px`; the Experience panel is a full-height card.
- **QR now points at the deploy-preview .vcf** because production still runs the old site (404). **Before/at merge to main: regenerate `res/contact-qr.svg` with the production URL** (segno, error='m', scale=10, border=3, dark #07070a, light #f3efe6).

## Round 5 (2026-10-02)
- Nav: brand "Mohamed Aziz BEN HAHA" (exact casing, the user's word), Contact link removed, gold button "Contact me" / "Me contacter", nav max-width 1180px (aligned with sections).
- Motto (the user merged options 3+4): "Build it. Automate it. Then teach what runs in production." / « Le construire. L'automatiser. Puis enseigner ce qui tourne en production. » Signature in Mrs Saint Delafield (Google Fonts), like the LinkedIn banner. Photo band no longer `fixed` (zoomed out), lighter overlay.
- Footer: logo + "© 2026 Mohamed Aziz Ben Haha. All rights reserved." left, the hero contact buttons right. Legal notice / Privacy / Terms and their dialog removed on the user's word.
- Training: first 5 programmes, then the same Show more / Show less as courses (shared `MORE` list in `main.js`).
- QR restyled like the phone's contact QR (dots, round eyes, LinkedIn photo `res/contact-photo.jpg` in the centre, error level H, decoded OK with zxing-cpp). The phone's own QR embeds the vCard with BDAY: not published. `.vcf` now has FN "Mohamed Aziz BEN HAHA" and the photo (CRLF kept via `.gitattributes`). Regenerating the QR for production: same recipe, URL https://mohamedazizbenhaha.netlify.app/res/mohamed-aziz-ben-haha.vcf.

## Round 6 (2026-10-02)
- Footer: more space between logo and copyright.
- Motto: `fitMotto()` sizes each line so both start and end at the same edges (blockquote max 980px); re-runs on fonts ready, resize, language. Signature smaller, right-aligned, gold dash before it.
- Programme modal: "Rhythm" fact removed; buttons **Book** (booking template) · **Customise** (customisation template) · Download (Word) if a doc exists. Both mails open in a new tab with subject + body.
- Every plain contact mailto (hero, modal "Email me", footer) gets a default subject ("Contact from your website" / « Prise de contact depuis votre site »), set by `setMailSubjects()`.
- Portrait: no tilt, no hover effect, 10px corners.

## Round 7 (2026-10-02)
- New hero portrait (the user's choice): AI portrait generated from their recent photos (they are 28; older photos were from age 24). "AI" watermark painted out, cropped 4:5, 880×1100 (`res/portrait.jpg`). Source: `Downloads/2026-10-02_02-02-51_Lumina.png`. QR centre and contact-card photo still use the LinkedIn photo.

## Round 8 (2026-10-02)
- Name written "Mohamed Aziz BEN HAHA" everywhere on the page (hero h1, title/meta, alt texts, signature, footer ©), the user's word: case sensitive.
- Signature font = Babylonica (Google Fonts): closest free match to the LinkedIn banner signature (the banner's exact font is likely a Canva signature font, not identified for sure).

## Deviations from the recommendations
- Hero status keeps availability: "Based in Écully, France · working with Tunisia · open to missions & training" (the green "available" dot would be meaningless with location only). Wraps to two lines on a 375px phone.
- Mentor card got its own icon (`#i-team`) since it lost the counters.
- Education: chose the "centre under dots" option (symmetric at 1440 and 1024).

## Still open (ask the user only when the task needs it)
- Freelance projects for Industry (client type, what, stack, year); old site claimed "15+ CI/CD pipelines on freelance projects".
- More detail per teaching role; other supervised PFE projects.
- What "replace" meant at the end of the user's message on 2026-10-01 (it was cut off).
- Guidelines items not done (low value or need the user): logo-strip images have no width/height attributes (CSS fixes their height, no visible shift); the marquee has no pause control (it stops under reduced motion).
- Merge `redesign` → `main` (production) needs the user's word. Then switch the QR to the production URL (see Round 4).
- Word files for the other training programmes.
- Phone "Desktop site" mode renders ~980px; the nav collapses below 1020px. If the user wants the full nav there, lower that breakpoint.
- Main CV PDF says "500+ heures"; the site says 1,000+. The user should update the PDF.
- The user must revoke the old Gmail app password (it is in the public repo history).
