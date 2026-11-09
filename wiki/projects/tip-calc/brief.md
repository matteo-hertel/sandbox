# Brief — tip-calc

Part of [[index]]. Status: **filled by forge-discovery, 2026-11-09, headless.** Source: ticket LOCAL-6
("A one-page tip calculator: bill, tip percent, people, and what each person pays"). No one was
available to answer, so every line marked *assumed* is the recommended option taken under
forge-principles rule 10; each is a two-way door.

## What it is

A one-page tip calculator. You enter the bill, a tip percent and the number of people; it shows the
tip, the total and what each person pays.

## Who & when

*Assumed.* Whoever holds the phone at the table when the check lands. Right before: the server puts the
check down and someone says "let's split it". The action: type the bill, set the tip, set the head
count, read one number. Right after: everyone pays their share.

## How it should feel

*Assumed.* Instant, like the phone's built-in Calculator: open it, type, read the answer. No Calculate
button, no ads, no sign-in, no "0.00" shown while a field is still blank. One hand, thumb only, under
restaurant light.

## The hard/interesting part

Money rounding. $100.00 at 18% across 3 people is $39.333… each; people pay whole cents. *Assumed rule:*
work in integer cents, round the tip to the nearest cent, round each share **up** to the cent so the
table is never short, and show the total beside it so the overage (under one cent per person) is visible.
The second knot is input that is not a number: blank, negative, zero people, 2.5 people, 1e308 must
never print `NaN`, `Infinity` or a negative share.

## The friction it replaces

The phone Calculator: type the bill, multiply by 1.18, divide by 3, re-do it when someone wants 20%.
The annoying part is the re-typing each time the tip or the head count changes. Observed surprises:
none, the current way has not been watched (see Human evidence).

## Smallest useful version

One page, the whole ticket: three inputs (bill, tip percent, people), live results (tip, total, each
person pays), the rounding rule above and sane handling of bad input. This is phase 1; there is no
smaller useful cut and nothing to defer. Two small unlocks from the ambition check ride with it:

- **Tip presets** (15 / 18 / 20) beside the free percent field: one tap instead of typing. Proof: a test
  that a preset sets the percent and the results follow. Pressure valve: if the row does not fit at 320px
  without scrolling, drop the presets and keep the field.
- **Numeric keypad** on tap (`inputmode="decimal"` on the bill, `numeric` on percent and people). Proof:
  the attributes asserted in a test, and the owner confirms the keypad on their phone at the
  human-evidence gate. Pressure valve: if a target phone's keypad lacks the decimal point, fall back to
  `type="number"`.

## Human evidence

Unknown — schedule a human-evidence gate after the smallest useful workflow and before polish: the
ticket owner opens the page on their phone at the next real check with two or more people, enters the
bill, tip and head count, and says whether the per-person number matched what they would have paid.

## Three-year fit

*Assumed.* Same: a finished utility that stays small, not a product that grows.

## Constraints

- **Fixed:** one page; works offline from a static file; no server, no network calls, no storage; usable
  at 320px wide; no currency symbol (the currency is the user's, 2 decimals only).
- **Default, free to challenge in the plan:** plain HTML, CSS and JS in no more than a few files, no
  framework, no build step, no dependencies. The rounding logic stays a pure function that a test can
  call without a browser.

## Non-goals

- No uneven or per-item splits: everyone pays the same share.
- No accounts, history, saved settings or sharing.
- No tax detection, service-charge rules, or tip-etiquette advice by country.
- No payment or banking integration, no currency conversion.
- No install, PWA or native app in v1.

## Shape chosen

*Assumed.* **A single static page.** Alternatives weighed: a framework app (React/Vite) costs a build and
dependencies for three inputs and one output; a CLI is not what you hold at a table; the phone Calculator
and the bill-split features inside payment apps already exist and are the friction above (no live tip,
needs an account or an app). One page opens anywhere and is the least that delivers the ticket. Recorded
here rather than as an ADR: it is a two-way door, and ADRs live outside this project's write path
(`wiki/decisions/`).

**Ambition check (2026-11-09):** raised: tip presets and the numeric keypad join the smallest version
(both cheap, both serve the thumb-at-a-table feel). Parked in [[projects/tip-calc/improvements]]: the
exact odd-cent split line and a remembered last tip (it needs storage, which a fixed constraint rules
out).

## What you're drawn to / unsure about

Drawn to: the result changing under your thumb as you type. Unsure: the odd-cent rule above, since the
shares can add up to a few cents more than the total. Open question for the owner: should the page
instead show the exact split ("2 pay 33.34, 1 pays 33.33")?
