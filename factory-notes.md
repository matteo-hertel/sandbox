# Factory notes

## QA

**Working directory:** repo root of this checkout, then `tip-calc/`.

**Stack:** none to start, and none to stop. `tip-calc/` is a static, offline-only
page — no server, no build step, no port, no backend (brief: "works offline
from a static file... no server, no network calls, no storage"). `npm ci` only
installs the `playwright-core` devDependency used by the test suite; it is not
needed to view the page.

**App URL:** open `tip-calc/index.html` directly from disk over `file://`, e.g.

```
file:///<absolute-path-to-this-checkout>/tip-calc/index.html
```

Open it straight in a browser (desktop or, for the real-phone evidence gate,
a phone's browser pointed at a copy of the file). This is exactly how the
project's own `page.test.mjs` opens it — over `file://`, in a 320x568 mobile
Chromium context — so QA is exercising the same path the gate already proved.

**Readiness check:** none — there is no server to wait on and no network call
to await. The page is ready as soon as it finishes loading. Confirm by title
("Tip calculator") and the "Each pays" readout being visible above the fields.

**Login / fixtures:** none. The page has no accounts, auth or backend (brief
non-goal: "no accounts, history, saved settings or sharing"). Type values
directly into Bill, Tip % and People. Smoke input: `100` / `18` / `3` should
read `39.34` each, Tip `18.00`, Total `118.00`, with "Rounded up to the cent."
and "3 × 39.34 = 118.02" shown below Total.

**Tip presets (phase 2):** with Bill `100` and People `3`, the "Tip %" row
holds three buttons (`15%`, `18%`, `20%`) beside the free percent field, all
four fitting one row without sideways scroll at 320px wide. Tapping `18%`
fills the field with `18`, turns that button blue (the other two stay
paper-colored) and shows `39.34`; tapping `20%` swaps the selection and shows
`40.00`. Typing a number by hand (e.g. `22`) selects none of the three
buttons. Tab from Bill reaches `15%`, `18%`, `20%`, the field, then People;
Space activates a focused preset the same as a tap.

**Stack-stop:** none — no process was started; close the tab/window.
