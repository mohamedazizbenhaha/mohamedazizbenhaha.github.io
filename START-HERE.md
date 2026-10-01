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

## Deviations from the recommendations
- Hero status keeps availability: "Based in Écully, France · working with Tunisia · open to missions & training" (the green "available" dot would be meaningless with location only). Wraps to two lines on a 375px phone.
- Mentor card got its own icon (`#i-team`) since it lost the counters.
- Education: chose the "centre under dots" option (symmetric at 1440 and 1024).

## Still open (ask the user only when the task needs it)
- Freelance projects for Industry (client type, what, stack, year); old site claimed "15+ CI/CD pipelines on freelance projects".
- More detail per teaching role; other supervised PFE projects.
- What "replace" meant at the end of the user's message on 2026-10-01 (it was cut off).
- Guidelines items not done (low value or need the user): logo-strip images have no width/height attributes (CSS fixes their height, no visible shift); the marquee has no pause control (it stops under reduced motion).
- Merge `redesign` → `main` (production) needs the user's word.
- Phone "Desktop site" mode renders ~980px; the nav collapses below 1020px. If the user wants the full nav there, lower that breakpoint.
- Main CV PDF says "500+ heures"; the site says 1,000+. The user should update the PDF.
- The user must revoke the old Gmail app password (it is in the public repo history).
