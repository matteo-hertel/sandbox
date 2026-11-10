"use strict";

function calc(input) {
  var BILL_RE = /^(?:(\d{1,6})(?:[.,](\d{0,2}))?|[.,](\d{1,2}))$/;
  var WHOLE_RE = /^\d+$/;

  function blank(value) {
    return value === undefined || value === null || String(value).trim() === "";
  }

  function parseBillCents(trimmed) {
    var match = BILL_RE.exec(trimmed);
    if (!match) return null;
    var intDigits, fracDigits;
    if (match[1] !== undefined) {
      intDigits = match[1];
      fracDigits = match[2] || "";
    } else {
      intDigits = "0";
      fracDigits = match[3];
    }
    var fracCents = parseInt((fracDigits + "00").slice(0, 2), 10);
    return parseInt(intDigits, 10) * 100 + fracCents;
  }

  function parseWhole(trimmed, min, max) {
    if (!WHOLE_RE.test(trimmed)) return null;
    var value = parseInt(trimmed, 10);
    if (value < min || value > max) return null;
    return value;
  }

  var billTrim = blank(input.bill) ? "" : String(input.bill).trim();
  var tipTrim = blank(input.tip) ? "" : String(input.tip).trim();
  var peopleTrim = blank(input.people) ? "" : String(input.people).trim();

  var billCents = null;
  var billInvalid = false;
  if (billTrim !== "") {
    billCents = parseBillCents(billTrim);
    billInvalid = billCents === null;
  }

  var tipPercent = null;
  var tipInvalid = false;
  if (tipTrim !== "") {
    tipPercent = parseWhole(tipTrim, 0, 100);
    tipInvalid = tipPercent === null;
  }

  var peopleCount = null;
  var peopleInvalid = false;
  if (peopleTrim !== "") {
    peopleCount = parseWhole(peopleTrim, 1, 999);
    peopleInvalid = peopleCount === null;
  }

  var invalid = [];
  if (billInvalid) invalid.push("bill");
  if (tipInvalid) invalid.push("tip");
  if (peopleInvalid) invalid.push("people");

  var tipCents = null;
  var totalCents = null;
  var eachCents = null;
  var collectedCents = null;

  if (billCents !== null && tipPercent !== null) {
    tipCents = Math.floor((billCents * tipPercent + 50) / 100);
    totalCents = billCents + tipCents;
    if (peopleCount !== null) {
      eachCents = Math.ceil(totalCents / peopleCount);
      collectedCents = eachCents * peopleCount;
    }
  }

  return {
    tipCents: tipCents,
    totalCents: totalCents,
    eachCents: eachCents,
    collectedCents: collectedCents,
    invalid: invalid,
  };
}
