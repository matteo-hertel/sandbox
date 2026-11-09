# ADR 0001 — a static page: `index.html` and `calc.js`

Part of [[index]]. Status: **accepted (assumed), 2026-11-09, project tip-calc.** Taken headless under forge-principles rule 10: no one was available, so the recommended option is locked. Two-way door. Lives here because the line restricts writes to `wiki/projects/tip-calc/`; promote to `wiki/decisions/` when that path is open.

## Context

[[projects/tip-calc/brief]]: one page; works offline from a static file; no server, network, storage; 320px wide; "plain HTML, CSS and JS in no more than a few files, no framework, no build step, no dependencies" as a default the plan may challenge; the rounding logic "stays a pure function that a test can call without a browser". The repo is a sandbox with one folder per proof of concept and no `CLAUDE.md` or `AGENTS.md`, so there is no layout rule to follow.

## Decision

Approach A, the minimal viable. A new folder `tip-calc/` at the repo root:

- `index.html`: markup, the CSS tokens of [[projects/tip-calc/DESIGN]], and the wiring script.
- `calc.js`: the pure function `calc`, a classic script (no `import`, no `export`) that declares one global.
- `fonts/`: the three woff2 files and the OFL licence from `wiki/projects/tip-calc/design/fonts/`.

No framework, bundler, build step or runtime dependency. Test tooling is [[projects/tip-calc/decisions/0003-real-browser-tests]].

## Why

- Fewest parts that deliver the brief: three inputs and one readout need no framework.
- A classic script, not an ES module: Chrome refuses module scripts from `file://`, and the brief says the page works from a static file. Checked 2026-11-09 in Chromium 141.0.7390.37 (headless shell) over `file://`: an external classic script loads; the same file as `type="module"` is blocked ("from origin 'null' has been blocked by CORS policy"); an inline module runs but could import nothing from disk. Node tests load `calc.js` with `node:vm` (`runInThisContext`; `calc` is a top-level `function` declaration, see [[projects/tip-calc/decisions/0003-real-browser-tests]] Checked facts), so the shipped file carries no `module.exports` shim.
- `calc.js` is the only file split out, because the brief names the pure function and a Node test must be able to call it. CSS and wiring stay in `index.html`: nothing in the brief asks for more files.

## Alternatives considered

**A: minimal viable (chosen).** Effort S. Reuses the tokens in `DESIGN.md`, the fonts in `design/fonts/` and the `calc()` shape in the variants board. Pros: opens from `file://` with nothing to build or install; the pure function is trivially testable. Cons: no type checker in a no-build project; markup, CSS and wiring share one file of about 300 lines.

**B: ideal architecture.** Effort M. TypeScript in strict mode, modules `calc`, `parse`, `view`, `main`, bundled to one file, Vitest with jsdom. Pros: strict types, units testable without a browser, clear module boundaries. Cons: a build step and about five dependencies for three inputs and one readout; a bundle step is needed anyway because modules do not load from `file://`; it overrides the brief's default for no outcome the brief asks for.

**C: lateral, one self-contained file.** Effort M. Fonts inlined as base64 so the whole app is one `.html` you can save to a phone. Pros: truly one file offline; hostable anywhere. Cons: a build step or a 70 KB unreadable blob; the pure function has to be pulled out of the HTML to be tested; it overrides the self-hosted woff2 decision in [[projects/tip-calc/design/adr-design-system]]; the brief does not ask for single-file distribution.

## Consequences

- No type checker. The strictness here is `"use strict"` and the tests. **Evidence that would change this:** a defect class the tests miss that `tsc --checkJs` would have caught (then B's checker alone, as a devDependency, not B's whole build).
- If the owner wants to hand the page over as a single file, C is a build step on top of A, not a rewrite.
- A second code file earns its place only with a second caller or a brief clause; "keep it tidy" is not one.
