import { test } from "node:test";
import assert from "node:assert/strict";
import vm from "node:vm";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const source = fs.readFileSync(path.join(__dirname, "calc.js"), "utf8");
vm.runInThisContext(source, { filename: "calc.js" });

test("calc.js declares exactly one global, calc", () => {
  const context = vm.createContext({});
  vm.runInContext(source, context);
  assert.deepStrictEqual(Object.keys(context), ["calc"]);
});

test("100.00 / 18 / 3 is the brief's worked example", () => {
  assert.deepStrictEqual(calc({ bill: "100.00", tip: "18", people: "3" }), {
    tipCents: 1800,
    totalCents: 11800,
    eachCents: 3934,
    collectedCents: 11802,
    invalid: [],
  });
});

test("84.00 / 20 / 4 divides evenly: collected equals total", () => {
  const r = calc({ bill: "84.00", tip: "20", people: "4" });
  assert.equal(r.eachCents, 2520);
  assert.equal(r.collectedCents, r.totalCents);
});

test("1248.60 / 22 / 14", () => {
  const r = calc({ bill: "1248.60", tip: "22", people: "14" });
  assert.equal(r.eachCents, 10881);
  assert.equal(r.collectedCents, 152334);
});

test("comma is accepted as the decimal point", () => {
  const withComma = calc({ bill: "64,50", tip: "18", people: "3" });
  const withDot = calc({ bill: "64.50", tip: "18", people: "3" });
  assert.deepStrictEqual(withComma, withDot);
});

test("64. and .5 are valid, so typing 64.50 never flashes an error", () => {
  const trailingDot = calc({ bill: "64.", tip: "0", people: "1" });
  assert.equal(trailingDot.totalCents, 6400);
  assert.equal(trailingDot.invalid.length, 0);

  const leadingDot = calc({ bill: ".5", tip: "0", people: "1" });
  assert.equal(leadingDot.totalCents, 50);
  assert.equal(leadingDot.invalid.length, 0);
});

test("999999.99 at 100% for 1 is the largest value", () => {
  const r = calc({ bill: "999999.99", tip: "100", people: "1" });
  assert.equal(r.eachCents, 199999998);
  assert.equal(r.invalid.length, 0);
});

test("all three blank: every cents field null, invalid empty", () => {
  assert.deepStrictEqual(calc({ bill: "", tip: "", people: "" }), {
    tipCents: null,
    totalCents: null,
    eachCents: null,
    collectedCents: null,
    invalid: [],
  });
});

test("bill only: tip, total, each all null", () => {
  const r = calc({ bill: "64.50", tip: "", people: "" });
  assert.equal(r.tipCents, null);
  assert.equal(r.totalCents, null);
  assert.equal(r.eachCents, null);
  assert.equal(r.collectedCents, null);
  assert.deepStrictEqual(r.invalid, []);
});

test("bill and tip, no people: tip and total set, each null", () => {
  const r = calc({ bill: "64.50", tip: "18", people: "" });
  assert.equal(r.tipCents, 1161);
  assert.equal(r.totalCents, 7611);
  assert.equal(r.eachCents, null);
  assert.equal(r.collectedCents, null);
  assert.deepStrictEqual(r.invalid, []);
});

test("bill and people, no tip: all null", () => {
  assert.deepStrictEqual(calc({ bill: "64.50", tip: "", people: "3" }), {
    tipCents: null,
    totalCents: null,
    eachCents: null,
    collectedCents: null,
    invalid: [],
  });
});

test("tip and people, no bill: all null", () => {
  assert.deepStrictEqual(calc({ bill: "", tip: "18", people: "3" }), {
    tipCents: null,
    totalCents: null,
    eachCents: null,
    collectedCents: null,
    invalid: [],
  });
});

test("a field of spaces only is blank, not zero, in every field", () => {
  const filled = { bill: "64.50", tip: "18", people: "3" };
  for (const field of ["bill", "tip", "people"]) {
    for (const spaces of [" ", "   ", "\t", " \n "]) {
      const label = `${field}=${JSON.stringify(spaces)}`;
      const r = calc({ ...filled, [field]: spaces });
      assert.deepStrictEqual(r, calc({ ...filled, [field]: "" }), label);
      assert.deepStrictEqual(r.invalid, [], label);
      assert.equal(r.eachCents, null, label);
    }
  }
  assert.deepStrictEqual(calc({ bill: "  ", tip: "  ", people: "  " }), {
    tipCents: null,
    totalCents: null,
    eachCents: null,
    collectedCents: null,
    invalid: [],
  });
});

const HOSTILE_BILLS = ["-5", "1e308", "NaN", "Infinity", "1.234", "1,248.60", "1000000", ".", "0x10"];
for (const bill of HOSTILE_BILLS) {
  test(`hostile bill ${JSON.stringify(bill)} is invalid and nulls what needs it`, () => {
    const r = calc({ bill, tip: "18", people: "3" });
    assert.deepStrictEqual(r.invalid, ["bill"]);
    assert.equal(r.tipCents, null);
    assert.equal(r.totalCents, null);
    assert.equal(r.eachCents, null);
    assert.equal(r.collectedCents, null);
  });
}

const HOSTILE_TIPS = ["101", "-1", "1.5", "1e2"];
for (const tip of HOSTILE_TIPS) {
  test(`hostile tip ${JSON.stringify(tip)} is invalid and nulls what needs it`, () => {
    const r = calc({ bill: "64.50", tip, people: "3" });
    assert.deepStrictEqual(r.invalid, ["tip"]);
    assert.equal(r.tipCents, null);
    assert.equal(r.totalCents, null);
    assert.equal(r.eachCents, null);
    assert.equal(r.collectedCents, null);
  });
}

const HOSTILE_PEOPLE = ["0", "-1", "2.5", "1000", "1e308", "0x10", "abc"];
for (const people of HOSTILE_PEOPLE) {
  test(`hostile people ${JSON.stringify(people)} is invalid and nulls what needs it`, () => {
    const r = calc({ bill: "64.50", tip: "18", people });
    assert.deepStrictEqual(r.invalid, ["people"]);
    assert.equal(r.eachCents, null);
    assert.equal(r.collectedCents, null);
    // tip and total do not need people, so they still compute
    assert.equal(r.tipCents, 1161);
    assert.equal(r.totalCents, 7611);
  });
}

const SWEEP = {
  bill: { blank: ["", "  "], valid: ["64.50", "64,50", ".5", "999999.99"], hostile: HOSTILE_BILLS },
  tip: { blank: ["", "  "], valid: ["0", "18", "100"], hostile: HOSTILE_TIPS },
  people: { blank: ["", "  "], valid: ["1", "3", "999"], hostile: HOSTILE_PEOPLE },
};

function sweepValues(field) {
  const { blank, valid, hostile } = SWEEP[field];
  return [
    ...blank.map((value) => ({ value, kind: "blank" })),
    ...valid.map((value) => ({ value, kind: "valid" })),
    ...hostile.map((value) => ({ value, kind: "hostile" })),
  ];
}

test("every blank/valid/hostile combination: invalid names exactly the bad fields, results need every field they use", () => {
  for (const bill of sweepValues("bill")) {
    for (const tip of sweepValues("tip")) {
      for (const people of sweepValues("people")) {
        const label = JSON.stringify([bill.value, tip.value, people.value]);
        const r = calc({ bill: bill.value, tip: tip.value, people: people.value });
        const expectedInvalid = [
          ["bill", bill],
          ["tip", tip],
          ["people", people],
        ]
          .filter(([, v]) => v.kind === "hostile")
          .map(([name]) => name);
        assert.deepStrictEqual(r.invalid, expectedInvalid, label);
        const hasTotal = bill.kind === "valid" && tip.kind === "valid";
        const hasEach = hasTotal && people.kind === "valid";
        assert.equal(r.tipCents !== null, hasTotal, `tipCents ${label}`);
        assert.equal(r.totalCents !== null, hasTotal, `totalCents ${label}`);
        assert.equal(r.eachCents !== null, hasEach, `eachCents ${label}`);
        assert.equal(r.collectedCents !== null, hasEach, `collectedCents ${label}`);
        for (const key of ["tipCents", "totalCents", "eachCents", "collectedCents"]) {
          const v = r[key];
          if (v !== null) {
            assert.ok(Number.isSafeInteger(v) && v >= 0, `${key} must be a non-negative safe integer for ${label}, got ${v}`);
          }
        }
      }
    }
  }
});

function centsToBillString(cents) {
  const dollars = Math.trunc(cents / 100);
  const remainder = cents % 100;
  return dollars + "." + String(remainder).padStart(2, "0");
}

test("rounding sweep: half up on the tip, the table is never short, overage under a cent per person", () => {
  const TIPS = [0, 15, 18, 20, 100];
  const PEOPLE = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
  for (let billCents = 0; billCents <= 30000; billCents += 1) {
    const billStr = centsToBillString(billCents);
    for (const tip of TIPS) {
      const r = calc({ bill: billStr, tip: String(tip), people: "1" });
      assert.equal(r.totalCents, billCents + r.tipCents, `totalCents for ${billStr}/${tip}`);
      const exactTipTimes100 = billCents * tip;
      const diff = r.tipCents * 100 - exactTipTimes100;
      assert.ok(diff > -50 && diff <= 50, `half-up rounding for ${billStr}/${tip}: diff ${diff}`);
      for (const people of PEOPLE) {
        const withPeople = calc({ bill: billStr, tip: String(tip), people: String(people) });
        assert.deepStrictEqual(withPeople.invalid, [], `invalid for ${billStr}/${tip}/${people}`);
        for (const key of ["tipCents", "totalCents", "eachCents", "collectedCents"]) {
          assert.ok(Number.isSafeInteger(withPeople[key]), `${key} is a safe integer for ${billStr}/${tip}/${people}: ${withPeople[key]}`);
        }
        assert.ok(withPeople.eachCents * people >= withPeople.totalCents, `table never short for ${billStr}/${tip}/${people}`);
        assert.ok(withPeople.eachCents * people - withPeople.totalCents < people, `overage under a cent per person for ${billStr}/${tip}/${people}`);
        assert.equal(withPeople.collectedCents, withPeople.eachCents * people, `collectedCents for ${billStr}/${tip}/${people}`);
      }
    }
  }
});

test("65.10 at 15% rounds the exact half up to 977, never 976", () => {
  const r = calc({ bill: "65.10", tip: "15", people: "1" });
  assert.equal(r.tipCents, 977);
});
