# START HERE (handoff, updated 2026-10-01)

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

## Tasks from the user (2026-10-01): do all, in order
1. **About bento, last row → three equal boxes: certifications · universities & training centres · languages** (each ≈1/3).
   Today the last row is the "I mentor projects" card (holds the 8/9 counters + mentoring text) + Languages.
   Recommendation: rows 1-2 keep `I build` (2×2), `I teach`, `I research`, `1,000+ hours`; put **"I mentor projects"** in the slot of the `Écully ↔ Tunis` card, and move the location to the hero status line ("Based in Écully, France · working with Tunisia"). Row 3 = certifications count · institutions count · languages. Switch the bento to a 12-column grid so row 3 is 4+4+4 while rows 1-2 stay 6+3+3. No empty cells.
2. **Experience box gets a fixed height**, so the next title never moves when switching tabs.
   Don't hard-code a number: in `renderTabs()` measure the tallest panel across all groups and entries (render each off-screen once), in the current language, and set that as the panel `min-height`. Re-measure on resize and language switch (French is longer).
3. **Education timeline spacing:** the middle item nearly touches the right one and sits far from the left one.
   Cause: three left-aligned columns with long middle text. Fix: equal column gap (≥48px) and `max-width` on each item's text (~30ch), or centre each item under evenly spaced dots (1/6, 1/2, 5/6). Check the result at 1440 and 1024.
4. **Certifications: remove the years.** Keep the issuer where it adds information (Linux Foundation, Red Hat, Microsoft, Cisco); AWS cards need nothing under the title.
5. **Courses "Show more" button: restore the user's original design**, not a pill button.
   Original (git: `main:index.html` L544-549, `main:cv_css.css` L1301-1342, `main:cv_js.js` L546-570): plain text button, UPPERCASE, `letter-spacing: 4px`, 12px text, a 60px 1px line on each side (`::before`/`::after`), a double-angle icon (down → up when open) that rotates with a 0.3s transition, white text. Toggles "Show More" / "Show Less" (FR "Voir plus" / "Voir moins").
   Rebuild that look with our tokens (lines `var(--txt)`, gold on hover, draw the chevrons as an inline SVG, no Font Awesome). Keep the current logic: only the first row shows until opened.
6. **The page ending feels missing after Free courses** (the contact block became the Hire me modal).
   Recommendation: a closing band plus a real footer.
   - Band: one strong line + "Hire me" (opens the modal) + both resume downloads + socials.
   - Footer: section links, location, languages, "last updated", back to top.
   Never invent testimonials or metrics; nothing like that exists (see PRODUCT.md).
7. **ANETI trainings were delivered through ISAM Formation.**
   - In `EXP.pro`, the ANETI entry becomes **"ISAM Formation · for ANETI"**: Cloud, DevOps & AI Trainer, 08/2025 – 01/2026, same bullets.
   - Keep both logos in the strip.
   - The "9 universities & training centres" count stays (MUST, Sup'Com, ENSTAB, TED, ISAM, ANETI, Clevory, TTC, GoMyCode); say so if the user asks.
   - Update `content.md` too.

## Still open (ask the user only when the task needs it)
- Freelance projects for Industry (client type, what, stack, year); old site claimed "15+ CI/CD pipelines on freelance projects".
- More detail per teaching role; other supervised PFE projects.
- What "replace" meant at the end of the user's message on 2026-10-01 (it was cut off).
- Phone "Desktop site" mode renders ~980px; the nav collapses below 1020px. If the user wants the full nav there, lower that breakpoint.
- Main CV PDF says "500+ heures"; the site says 1,000+. The user should update the PDF.
- The user must revoke the old Gmail app password (it is in the public repo history).
