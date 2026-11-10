# ADR 0003 — tests: `node:test` for `calc`, real Chromium for the page

Part of [[index]]. Status: **accepted (assumed), 2026-11-09, project tip-calc.** Taken headless under forge-principles rule 10. Two-way door. Lives here because the line restricts writes to `wiki/projects/tip-calc/`.

## Context

The brief asks for proof of things only a browser shows: "usable at 320px wide", "no network calls", "works offline from a static file", presets that "fit 320px without scrolling", the keypad attributes, and the pinned readout in [[projects/tip-calc/design/adr-calculator-screen]]. It also wants the rounding logic callable without one. Its default is "no dependencies"; that default governs the shipped page.

## Decision

Two test files in `tip-calc/`, run by `node --test` through `npm test`:

- `calc.test.mjs`: loads `calc.js` with `node:vm` (`runInThisContext`, so results share the test's realm). Fixed examples, hostile inputs and a sweep of the rounding invariants. No dependency.
- `page.test.mjs`: drives real Chromium with Playwright against `file://…/tip-calc/index.html` in a 320px context with `isMobile: true`, so the viewport meta is honoured as on a phone, with every non-`file:` request and every WebSocket blocked and counted, and `localStorage`, `sessionStorage` and IndexedDB checked empty at the end.

`tip-calc/package.json` declares one **devDependency**, `playwright-core` pinned to `1.56.1` (the version whose Chromium build is installed on the factory at `/opt/ms-playwright`, found through `PLAYWRIGHT_BROWSERS_PATH`), and the `test` script, which names both files: `node --test calc.test.mjs page.test.mjs`. Nothing in `package.json` ships with the page.

## Why

- Geometry (does the row fit 320px, is the focused field under the pinned readout with the keypad up) and "loads from `file://` with no network" cannot be seen in a DOM simulation.
- The pure function gets its own dependency-free file because it is the part where a wrong answer costs someone money, and a sweep runs in seconds in Node.

## Alternatives considered

- **jsdom or happy-dom (devDependency):** runs the wiring but has no layout, so it cannot prove the 320px fit, the pinned geometry or a `file://` load; the checks that matter most would stay manual.
- **No DOM test; the QA station checks by hand:** the gate would not be a command, and a layout regression would only surface at the next QA run.
- **Playwright's full `playwright` package:** at 1.56.1 it has no install script either, so it does not download browsers on install (checked below); it is `playwright-core` plus the `playwright/test` runner and an optional `fsevents`, none of which this project uses, so `playwright-core` stays the smaller install.

## Consequences

- A machine without the matching Chromium fails the page tests loudly; a skipped browser test counts as failing. The mechanism: Chromium launches in a `before` hook (a throwing hook fails the suite, exit 1), no test calls `skip` or `todo`, and the gate reads `skipped 0` and `todo 0` from the summary, because `node --test` exits 0 on a skipped test. **Evidence that would change this:** the line's builds move to a machine with a different Chromium (then bump the pin).
- `npm ci` is the first step of every phase gate; it needs the npm registry once.
- Two test files and one devDependency are the whole test surface; a new test must go red when a named behaviour breaks.
- The 320 × 208 keypad check proves Chromium only. iOS Safari keeps its layout viewport full height under the keypad and no WebKit is installed, so an iPhone is covered by the human-evidence gate alone.

## Checked facts (2026-11-09, on the factory machine)

| Fact | Source | Consequence |
|---|---|---|
| `playwright-core@1.56.1` exists, Apache-2.0, no dependencies, no install scripts, `engines.node >=18`, published 2025-10-17; `latest` is 1.65.0. Four maintainers (`pavelfeldman`, `yurys`, `dgozman-ms`, `playwright-bot`), repository `github.com/microsoft/playwright`, a registry signature and SLSA v1 provenance, integrity `sha512-hutraynyn31F+Bifme+Ps9Vq59hKuUCz7H1kDOcBs+2oGguKkWTU50bBWrtz34OUWmIwpBTWDxaRPXrIXkgvmQ==`; npm's registry here is `https://registry.npmjs.org/`; the npm bulk-advisory endpoint returns no advisory for it | `npm view playwright-core@1.56.1 …` (with `maintainers dist.signatures dist.attestations dist.integrity`); `npm config get registry`; `POST registry.npmjs.org/-/npm/v1/security/advisories/bulk` | Installing it downloads no browser. The pin is a year behind `latest` on purpose; it is past CVE-2025-59288 (GHSA-7mvr-c777-76hp, filed against `playwright` < 1.55.1, browser-install path only). Trust posture: exact pin, committed lockfile, `npm ci` checks the tarball against the lockfile's integrity, which should equal the value here. |
| Its `browsers.json` expects `chromium` and `chromium-headless-shell` revision 1194 (Chromium 141.0.7390.37) | `/usr/lib/node_modules/playwright/node_modules/playwright-core/browsers.json` (the same 1.56.1) | The pin and the machine agree. |
| `/opt/ms-playwright` holds `chromium_headless_shell-1194` and `ffmpeg-1011` only; `PLAYWRIGHT_BROWSERS_PATH=/opt/ms-playwright` | `ls /opt/ms-playwright`; `env` | Default `chromium.launch()` starts headless shell 141.0.7390.37. `headless: false` and `channel: 'chromium'` fail: "Executable doesn't exist at /opt/ms-playwright/chromium-1194/chrome-linux/chrome". Tests launch with the defaults. |
| Over `file://` in that browser, the three Plex woff2 load by relative URL and no request fails | `design/specimen.html` opened in a 320 × 568 `isMobile` context | Self-hosted fonts work offline; the page test asserts the faces `loaded`. |
| `context.route('**/*')` receives `file:` requests as well | the same run | The route continues `file:` and aborts the rest; aborting everything would abort the page. |
| With that route aborting every non-`file:` request, a `fetch`, an image and a `sendBeacon` from a `file:` page reach the route, but `new WebSocket("wss://echo.websocket.org/")` reaches `open` (connected out; the machine has network) and the route never sees it; `context.routeWebSocket(/.*/, ws => ws.close())` sees it and the socket closes without connecting | `playwright-core` 1.56.1 probe from a `file:` page, 2026-11-09 | `page.test.mjs` adds a `routeWebSocket` handler that closes and counts; the request route alone does not prove "no network calls". |
| From a `file:` page in this Chromium, `localStorage`, `sessionStorage` and IndexedDB all accept writes; `document.cookie` does not | the same probe | "No storage" is falsifiable: the page test reads all three as empty at the end of the run. |
| An `isMobile` context lays a page without a viewport meta out at 980px wide | `Readme.md` opened in that context | Only the mobile context makes "320px" mean what a phone shows. |
| Node v22.23.4, npm 10.9.9: `node:test` and `node:vm` present; `node --test missing.mjs` exits 1 with "Could not find"; a run with only skipped tests exits 0; a throwing `before` hook fails its suite (`hookFailed`, exit 1) | `node --version`; `node --test` and `node -e` probes | The `test` script names its files; "none skipped" is read from the summary. |
| `vm.runInContext` in a new context returns objects `assert.deepStrictEqual` rejects ("same structure but are not reference-equal"); a top-level `const calc` is not on the context object; `vm.runInThisContext` with a top-level `function calc` passes | `node -e` probe | `calc.test.mjs` uses `runInThisContext` and `calc.js` declares a function. |
| Chrome for Android 108+ resizes only the visual viewport for the keypad unless the viewport meta sets `interactive-widget=resizes-content`; iOS Safari does not support the key and positions sticky elements against the layout viewport | developer.chrome.com/blog/viewport-resize-behavior; MDN `<meta name="viewport">`; WebKit bug reports | `index.html` sets `resizes-content`, so the 320 × 208 check models Chrome for Android; an iPhone rests on the human-evidence gate. |
