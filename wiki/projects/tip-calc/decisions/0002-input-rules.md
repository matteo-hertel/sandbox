# ADR 0002 — what the three fields accept, and what blank means

Part of [[index]]. Status: **accepted (assumed), 2026-11-09, project tip-calc.** Taken headless under forge-principles rule 10. Two-way door; each limit is one constant in `calc.js`. Lives here because the line restricts writes to `wiki/projects/tip-calc/`.

## Context

[[projects/tip-calc/brief]] says input that is not a number "(blank, negative, zero people, 2.5 people, 1e308) must never print `NaN`, `Infinity` or a negative share", asks for `inputmode="decimal"` on the bill and `numeric` on percent and people, fixes "2 decimals only" and no currency symbol, and says "no `0.00` shown while a field is still blank". It does not say which text is valid, how large a value may be, or whether a blank tip means zero. [[projects/tip-calc/DESIGN]] fixes the hero at ten characters (`min(48px, 16cqw)`, a 256px column at 320px).

## Decision

`calc({ bill, tip, people })` takes the three fields as typed (strings), trims them, and treats an empty string as **blank**, never as invalid. A non-blank value that breaks its rule is **invalid**.

| Field | Valid | Limits |
|---|---|---|
| bill | digits, optionally `.` or `,` and up to 2 decimal digits; at least one digit overall (`64`, `64.`, `.5`, `64,50`) | up to 6 integer digits (999999.99 at most) |
| tip | whole percent, digits only | 0 to 100 |
| people | whole number, digits only | 1 to 999 |

Everything else is invalid: a sign, an exponent (`1e308`), `NaN`, `Infinity`, a third decimal, `2.5` people, `0` people, `1,248.60`.

**Blank is unanswered, not zero.** Tip and Total need the bill and the tip. Each pays needs all three. A blank tip is never treated as 0%. Invalid input shows its message under the field and the results that need it show nothing.

Money is integer cents throughout; the rounding rule is the brief's: tip to the nearest cent (half up), each share rounded up to the cent, and the cents collected (each × people) returned beside the total.

## Why

- `inputmode="numeric"` keypads have no decimal point, so a whole percent follows from the brief's keypad clause; `decimal` on the bill follows from "2 decimals only".
- A decimal keypad on a comma-locale phone types `,`. That input is reachable, so `,` reads as the decimal point; `1,248.60` becomes `1.248.60` and is invalid, which is the safe direction.
- The limits keep the largest each-pays at 1999999.98: ten characters, which fits the hero column, and far below 2^53 cents, so integer math stays exact. A tip above 100% is not a tip the brief asks for.
- A blank tip counted as zero would show an answer that omits the tip, and someone underpays. Waiting is the safe direction.
- A typed `64.` stays valid so typing `64.50` never flashes an error on the way.

## Alternatives considered

- **Blank tip as 0%** (what the variants board's mock code does): one fewer wait state, but it prints a share without the tip.
- **Fractional tip percent (17.5):** cannot be typed on a numeric keypad; it would also force the percent field to `decimal`, against the brief.
- **Larger limits** (7-digit bill, tip to 999%): the largest each-pays becomes 12 characters, which overflows the hero at 320px.
- **A default tip (18%)** so the answer shows sooner: a derived default the brief never asked for.

## Consequences

- Money wording lives in [[projects/tip-calc/DESIGN]] Voice; the messages name the field and its whole rule, limit included ("People: enter a whole number, 1 to 999.").
- A bill over 999999.99 or a tip over 100 shows a message instead of a number. **Evidence that would change this:** the owner hits a limit at a real check (raise it only with a hero that still fits).
- Numbers print as plain digits with a `.` and two decimals, no thousands separator and no currency symbol.
