# Architecture — tip-calc

Part of [[index]]. Status: **v1 written by `forge-plan`, 2026-11-09; reconciled by `forge-ship` every phase.** Lives in the project folder because the line restricts writes to `wiki/projects/tip-calc/`; the forge default is `wiki/architecture.md`.

```
tip-calc/                          (new, repo root)
  index.html ── markup + DESIGN.md tokens + wiring script
     │  input event on bill / tip / people  (phase 2: preset click sets tip)
     ▼
  calc.js ── calc({bill, tip, people}) → {tipCents, totalCents, eachCents, collectedCents, invalid}
     ▲                                    pure: strings in, integers or null out
     │ read by index.html (browser) and calc.test.mjs (node:vm runInThisContext)
  fonts/    3 × woff2 + OFL licence     loaded by @font-face from the same folder
  calc.test.mjs   node:test, no dependency
  page.test.mjs   Playwright → Chromium 141 headless shell, isMobile 320 wide → file://…/index.html
```

## Components & boundaries

- **`calc.js` | `index.html`.** The money rules end at the function's return value; everything that touches the DOM sits on the other side. Isolates a change to the rounding or input rules ([[projects/tip-calc/decisions/0002-input-rules]]) from a change to the layout, and lets a Node test call the rules with no browser.
- **`index.html` | `fonts/`.** Fonts are files fetched relative to the page, never a URL. Isolates "works offline from a static file" from the markup: swapping a face touches one folder and the `@font-face` rules.
- **tests | the page.** `calc.test.mjs` sees only `calc`; `page.test.mjs` sees only the rendered page through a real browser. Neither imports the wiring, so a refactor of the wiring that keeps the behaviour breaks nothing ([[projects/tip-calc/decisions/0003-real-browser-tests]]).

## Data flow

The user types in a field. `index.html` reads the three field strings, calls `calc`, and rewrites every output from that one result (so no old figure survives a cleared or broken field): the pinned readout (each pays), the Tip and Total rows, the rounding note under Total, and a message under any invalid field. A blank value renders as a label and a leader with no figure. Phase 2: a preset button writes its number into the tip field and runs the same path. Nothing is stored, sent or read back; closing the tab forgets everything. `page.test.mjs` holds that line: every non-`file:` request and every WebSocket is blocked and counted, and `localStorage`, `sessionStorage` and IndexedDB are read as empty at the end of the run ([[projects/tip-calc/decisions/0003-real-browser-tests]] Checked facts).

## The central bet

A pinned each-pays readout above native inputs keeps "the number changes under your thumb" true on a 320 × 568 phone with the keypad up ([[projects/tip-calc/design/adr-calculator-screen]]). Evidence that would revisit it: the Risk gate in [[projects/tip-calc/plan]] fails at 320 × 208, or the human-evidence gate shows people close the keypad before reading (then variant 1, the answer last). The 320 × 208 check models a layout viewport that shrinks with the keypad, which Chrome for Android does because the viewport meta sets `interactive-widget=resizes-content`. iOS Safari never shrinks it, so on an iPhone the human-evidence gate is the only test of the bet ([[projects/tip-calc/decisions/0003-real-browser-tests]] Checked facts).

## Scale assumptions

There is no data or load: one user, one page, no storage. The only quantity that grows is the input, and [[projects/tip-calc/decisions/0002-input-rules]] bounds it (6-digit bill, tip 0 to 100, people 1 to 999) so cents stay far below 2^53 and the largest figure, 1999999.98, fits the hero. At 10× or 100× nothing breaks; no phase needs to address it. Phase 1 holds the bounds.

## Parts list

- `tip-calc/` at the repo root: the one page (brief: "one page", "a static file").
- `index.html`: the three inputs and the live results (brief: smallest useful version).
- `calc.js`: the pure rounding and validation function (brief: "a pure function that a test can call without a browser").
- `fonts/` (3 woff2, 1 licence): the locked typefaces, self-hosted (brief: "works offline"; [[projects/tip-calc/design/adr-design-system]]).
- `package.json`, `package-lock.json`: one devDependency, `playwright-core`, and the `test` script (brief: "usable at 320px wide", "no network calls", presets that fit; [[projects/tip-calc/decisions/0003-real-browser-tests]]).
- `calc.test.mjs`: fixed examples, hostile inputs and the rounding sweep (brief: money rounding, input that is not a number).
- `page.test.mjs`: the rendered page at 320px, offline, keypad up (brief: 320px, no network, presets, keypad attributes).
- Left out on purpose, with the brief clause that excludes each: framework, bundler, build step, TypeScript (brief default, [[projects/tip-calc/decisions/0001-static-page-two-code-files]]); storage or remembered tip ("no storage"); service worker, manifest, install ("no PWA"); history, sharing, accounts (non-goals).
