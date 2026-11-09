# ADR 0003 — tests: `node:test` for `calc`, real Chromium for the page

Part of [[index]]. Status: **accepted (assumed), 2026-11-09, project tip-calc.** Taken headless under forge-principles rule 10. Two-way door. Lives here because the line restricts writes to `wiki/projects/tip-calc/`.

## Context

The brief asks for proof of things only a browser shows: "usable at 320px wide", "no network calls", "works offline from a static file", presets that "fit 320px without scrolling", the keypad attributes, and the pinned readout in [[projects/tip-calc/design/adr-calculator-screen]]. It also wants the rounding logic callable without one. Its default is "no dependencies"; that default governs the shipped page.

## Decision

Two test files in `tip-calc/`, run by `node --test` through `npm test`:

- `calc.test.mjs`: loads `calc.js` with `node:vm`. Fixed examples, hostile inputs and a sweep of the rounding invariants. No dependency.
- `page.test.mjs`: drives real Chromium with Playwright against `file://…/tip-calc/index.html`, with every non-`file:` request blocked and counted.

`tip-calc/package.json` declares one **devDependency**, `playwright-core` pinned to `1.56.1` (the version whose Chromium build is installed on the factory at `/opt/ms-playwright`, found through `PLAYWRIGHT_BROWSERS_PATH`), and the `test` script. Nothing in `package.json` ships with the page.

## Why

- Geometry (does the row fit 320px, is the focused field under the pinned readout with the keypad up) and "loads from `file://` with no network" cannot be seen in a DOM simulation.
- The pure function gets its own dependency-free file because it is the part where a wrong answer costs someone money, and a sweep runs in seconds in Node.

## Alternatives considered

- **jsdom or happy-dom (devDependency):** runs the wiring but has no layout, so it cannot prove the 320px fit, the pinned geometry or a `file://` load; the checks that matter most would stay manual.
- **No DOM test; the QA station checks by hand:** the gate would not be a command, and a layout regression would only surface at the next QA run.
- **Playwright's full `playwright` package:** downloads its own browsers on install; `playwright-core` plus the browser already on the machine is the smaller install.

## Consequences

- A machine without the matching Chromium fails the page tests loudly; a skipped browser test counts as failing. **Evidence that would change this:** the line's builds move to a machine with a different Chromium (then bump the pin).
- `npm ci` is the first step of every phase gate; it needs the npm registry once.
- Two test files and one devDependency are the whole test surface; a new test must go red when a named behaviour breaks.
