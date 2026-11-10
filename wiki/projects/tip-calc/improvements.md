# What I'd do with more time

Part of [[index]]. Running, honest list. Deliberate scope cuts go here too —
"deferred X for Y" is a positive signal, not an apology.

## Parked by the brief's ambition check (2026-11-09)

- **Exact odd-cent split.** When the share does not divide evenly, show "2 pay 33.34, 1 pays 33.33" so
  the shares add up to the total exactly. Parked because the brief's rule (round each share up, show the
  total) keeps the page at one number to read. Pull it in if the human-evidence gate shows people asking
  who covers the extra cent. Proof it would need: a sweep of bills and head counts where the shares sum
  to the total to the cent.
- **Remembered last tip percent.** Parked, not just deferred: it needs storage, and "no storage" is a
  fixed constraint in the brief. Reopen only if that constraint is relaxed on purpose.

## Parked by the plan (2026-11-09)

- **Hosting and getting the page onto a phone.** The brief has no deploy path, so the plan has none; the human-evidence gate relies on the owner's own route (the factory's host, or a copy of the folder). Pull it in as a phase with a Release closure if the page is to live at a URL. PWA and install stay a brief non-goal.
- **JS type checking.** `calc.js` runs under `"use strict"` and its tests only. `tsc --checkJs` would add a TypeScript devDependency; reopen it only if the tests miss a defect class it would catch ([[projects/tip-calc/decisions/0001-static-page-two-code-files]]).
- **A default tip percent.** A derived default the brief never asked for; a blank tip makes the answer wait ([[projects/tip-calc/decisions/0002-input-rules]]). Reopen if the human-evidence gate shows the first tap on a preset is always the same one.
