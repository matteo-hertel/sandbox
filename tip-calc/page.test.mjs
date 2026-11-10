import { test, before, after } from "node:test";
import assert from "node:assert/strict";
import { chromium } from "playwright-core";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PAGE_URL = pathToFileURL(path.join(__dirname, "index.html")).toString();
const EPS = 0.5;

function within(box, width, height) {
  return box.x >= -EPS && box.y >= -EPS && box.x + box.width <= width + EPS && box.y + box.height <= height + EPS;
}
function contains(outer, inner) {
  return (
    inner.x >= outer.x - EPS &&
    inner.y >= outer.y - EPS &&
    inner.x + inner.width <= outer.x + outer.width + EPS &&
    inner.y + inner.height <= outer.y + outer.height + EPS
  );
}
function overlaps(a, b) {
  return a.x < b.x + b.width && a.x + a.width > b.x && a.y < b.y + b.height && a.y + a.height > b.y;
}

let browser;

before(async () => {
  browser = await chromium.launch();
});

after(async () => {
  await browser.close();
});

async function openPage(contextOptions) {
  const context = await browser.newContext(
    Object.assign(
      {
        viewport: { width: 320, height: 568 },
        isMobile: true,
        hasTouch: true,
      },
      contextOptions
    )
  );

  const tracker = { nonFileRequests: [], failedRequests: [], consoleErrors: [], pageErrors: [], wsCount: 0 };

  await context.route("**/*", async (route) => {
    const url = route.request().url();
    if (url.startsWith("file:")) {
      await route.continue();
    } else {
      tracker.nonFileRequests.push(url);
      await route.abort();
    }
  });

  context.on("requestfailed", (req) => {
    tracker.failedRequests.push(req.url());
  });

  await context.routeWebSocket(/.*/, (ws) => {
    tracker.wsCount++;
    ws.close();
  });

  const page = await context.newPage();
  page.on("console", (msg) => {
    if (msg.type() === "error") tracker.consoleErrors.push(msg.text());
  });
  page.on("pageerror", (err) => {
    tracker.pageErrors.push(String(err));
  });

  return { context, page, tracker };
}

async function assertClean(page, tracker) {
  const storage = await page.evaluate(async () => ({
    localStorage: localStorage.length,
    sessionStorage: sessionStorage.length,
    indexedDB: (await indexedDB.databases()).length,
  }));
  assert.deepStrictEqual(storage, { localStorage: 0, sessionStorage: 0, indexedDB: 0 });
  assert.deepStrictEqual(tracker.nonFileRequests, []);
  assert.deepStrictEqual(tracker.failedRequests, []);
  assert.equal(tracker.wsCount, 0);
  assert.deepStrictEqual(tracker.consoleErrors, []);
  assert.deepStrictEqual(tracker.pageErrors, []);
}

async function settle(page) {
  await page.evaluate(() => document.fonts.ready);
}

async function textBox(page, selector) {
  return page.locator(selector).evaluate((el) => {
    const range = document.createRange();
    range.selectNodeContents(el);
    return range.getBoundingClientRect().toJSON();
  });
}

const FACES = [
  { family: "Plex Mono", weight: "500", file: "ibm-plex-mono-latin-500-normal.woff2" },
  { family: "Plex Mono", weight: "600", file: "ibm-plex-mono-latin-600-normal.woff2" },
  { family: "Plex Sans", weight: "400", file: "ibm-plex-sans-latin-400-normal.woff2" },
];

async function faceMatchesFile(page, face) {
  return page.evaluate(async ({ family, weight, file }) => {
    const ref = new FontFace("reference-face", `url(fonts/${file})`, { weight });
    document.fonts.add(await ref.load());
    const draw = (name) => {
      const canvas = document.createElement("canvas");
      canvas.width = 480;
      canvas.height = 64;
      const ctx = canvas.getContext("2d");
      ctx.font = `${weight} 40px "${name}"`;
      ctx.fillText("Each 1999.98 Tip", 0, 48);
      return ctx.getImageData(0, 0, canvas.width, canvas.height).data.join();
    };
    const same = draw(family) === draw("reference-face");
    document.fonts.delete(ref);
    return same;
  }, face);
}

async function setFields(page, { bill, tip, people }) {
  await page.fill("#bill", bill === undefined ? "" : bill);
  await page.fill("#tip", tip === undefined ? "" : tip);
  await page.fill("#people", people === undefined ? "" : people);
}

async function readoutState(page) {
  return page.evaluate(() => {
    const figure = document.getElementById("each-figure");
    const note = document.getElementById("each-note");
    return {
      figureHidden: figure.hidden,
      figureText: figure.textContent,
      noteText: note.textContent,
    };
  });
}

async function fieldState(page, name) {
  return page.evaluate((id) => {
    const input = document.getElementById(id);
    const msg = document.getElementById(id + "-msg");
    return {
      ariaInvalid: input.getAttribute("aria-invalid"),
      ariaDescribedby: input.getAttribute("aria-describedby"),
      msgHidden: msg.hidden,
      msgText: msg.textContent,
    };
  }, name);
}

test("offline load: no network, no console/page errors, empty state, fonts, worked example, recovery, max value", async () => {
  const { context, page, tracker } = await openPage();
  try {
    await page.goto(PAGE_URL);

    const viewportMeta = await page.getAttribute('meta[name="viewport"]', "content");
    assert.equal(viewportMeta, "width=device-width, initial-scale=1, interactive-widget=resizes-content");

    const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    assert.equal(scrollWidth, 320);

    assert.equal(await page.getAttribute("#bill", "inputmode"), "decimal");
    assert.equal(await page.getAttribute("#tip", "inputmode"), "numeric");
    assert.equal(await page.getAttribute("#people", "inputmode"), "numeric");

    let readout = await readoutState(page);
    assert.equal(readout.figureHidden, true);
    assert.equal(readout.noteText, "Type the bill. Each share shows here.");

    const bodyText = await page.evaluate(() => document.body.textContent);
    assert.ok(!bodyText.includes("0.00"), "empty state must not show 0.00");
    assert.ok(!bodyText.includes("NaN"), "empty state must not show NaN");
    assert.ok(!bodyText.includes("Infinity"), "empty state must not show Infinity");

    await setFields(page, { bill: "100", tip: "18", people: "3" });

    await settle(page);
    const faces = await page.evaluate(() => Array.from(document.fonts).map((f) => ({ family: f.family.replace(/"/g, ""), weight: f.weight, status: f.status })));
    assert.deepStrictEqual(
      faces.sort((a, b) => (a.family + a.weight).localeCompare(b.family + b.weight)),
      FACES.map(({ family, weight }) => ({ family, weight, status: "loaded" }))
    );
    for (const face of FACES) assert.ok(await faceMatchesFile(page, face), `${face.family} ${face.weight} must render from ${face.file}`);

    readout = await readoutState(page);
    assert.equal(readout.figureHidden, false);
    assert.equal(readout.figureText, "39.34");
    assert.equal(await page.textContent("#tip-amount"), "18.00");
    assert.equal(await page.textContent("#total-amount"), "118.00");

    const roundingHidden = await page.evaluate(() => document.getElementById("rounding-note").hidden);
    assert.equal(roundingHidden, false);
    assert.equal(await page.textContent(".rounding-line"), "Rounded up to the cent.");
    assert.equal(await page.textContent("#rounding-detail"), "3 × 39.34 = 118.02");

    const collectedText = await textBox(page, "#rounding-detail");
    const totalText = await textBox(page, "#total-amount");
    assert.ok(Math.abs(collectedText.right - totalText.right) <= 1, `118.02 and 118.00 text right edges align within 1px: ${JSON.stringify({ collectedText, totalText })}`);

    await page.focus("#people");
    await page.keyboard.press("Enter");
    readout = await readoutState(page);
    assert.equal(readout.figureText, "39.34");
    assert.ok(page.url().startsWith("file://") && page.url().endsWith("index.html"));

    await setFields(page, { bill: "52.80", tip: "15", people: "2.5" });
    let people = await fieldState(page, "people");
    assert.equal(people.ariaInvalid, "true");
    assert.equal(people.msgText, "People: enter a whole number, 1 to 999.");
    readout = await readoutState(page);
    assert.equal(readout.figureHidden, true);
    assert.equal(await page.textContent("#tip-amount"), "7.92");
    assert.equal(await page.textContent("#total-amount"), "60.72");
    assert.equal(await page.evaluate(() => document.getElementById("rounding-note").hidden), true);

    await page.fill("#people", "2");
    people = await fieldState(page, "people");
    assert.equal(people.ariaInvalid, null);
    assert.equal(people.msgHidden, true);
    readout = await readoutState(page);
    assert.equal(readout.figureText, "30.36");
    assert.equal(await page.evaluate(() => document.getElementById("rounding-note").hidden), true);

    await page.fill("#bill", "");
    readout = await readoutState(page);
    assert.equal(readout.figureHidden, true);
    assert.equal(await page.textContent("#tip-amount"), "");
    assert.equal(await page.textContent("#total-amount"), "");
    const bodyText2 = await page.evaluate(() => document.body.textContent);
    assert.ok(!bodyText2.includes("0.00"));

    await setFields(page, { bill: "999999.99", tip: "100", people: "1" });
    readout = await readoutState(page);
    assert.equal(readout.figureText, "1999999.98");

    await settle(page);
    const figureMetrics = await page.locator("#each-figure").evaluate((el) => ({ scrollWidth: el.scrollWidth, clientWidth: el.clientWidth }));
    assert.ok(figureMetrics.scrollWidth <= figureMetrics.clientWidth, JSON.stringify(figureMetrics));
    const figureBox = await page.locator("#each-figure").boundingBox();
    const figureText = await textBox(page, "#each-figure");
    const readoutBox = await page.locator(".readout").boundingBox();
    assert.ok(contains(readoutBox, figureBox), "figure box must be inside the readout box");
    assert.ok(contains(readoutBox, figureText), `figure text must be inside the readout box: ${JSON.stringify({ figureText, readoutBox })}`);

    assert.equal(await page.inputValue("#bill"), "999999.99");
    const billMetrics = await page.locator("#bill").evaluate((el) => ({ scrollWidth: el.scrollWidth, clientWidth: el.clientWidth }));
    assert.ok(billMetrics.scrollWidth <= billMetrics.clientWidth, JSON.stringify(billMetrics));

    await assertClean(page, tracker);
  } finally {
    await context.close();
  }
});

test("Bill field's top edge does not move across empty, part-filled, rounded and invalid states", async () => {
  const { context, page, tracker } = await openPage();
  try {
    await page.goto(PAGE_URL);
    await page.evaluate(() => window.scrollTo(0, 0));
    await settle(page);
    const emptyTop = (await page.locator("#bill").boundingBox()).y;

    await page.fill("#bill", "64.50");
    await page.evaluate(() => window.scrollTo(0, 0));
    await settle(page);
    const partFilledTop = (await page.locator("#bill").boundingBox()).y;

    await setFields(page, { bill: "100", tip: "18", people: "3" });
    await page.evaluate(() => window.scrollTo(0, 0));
    await settle(page);
    const roundedTop = (await page.locator("#bill").boundingBox()).y;

    await setFields(page, { bill: "1.234", tip: "18", people: "3" });
    await page.evaluate(() => window.scrollTo(0, 0));
    await settle(page);
    const invalidTop = (await page.locator("#bill").boundingBox()).y;

    assert.equal(partFilledTop, emptyTop);
    assert.equal(roundedTop, emptyTop);
    assert.equal(invalidTop, emptyTop);

    await assertClean(page, tracker);
  } finally {
    await context.close();
  }
});

test("320x208 keypad-up geometry: readout and the focused field stay whole and apart", async () => {
  const { context, page, tracker } = await openPage({ viewport: { width: 320, height: 208 } });
  try {
    await page.goto(PAGE_URL);
    await setFields(page, { bill: "100", tip: "18", people: "3" });

    for (const id of ["bill", "tip", "people"]) {
      await page.focus("#" + id);
      await page.waitForTimeout(50);
      await settle(page);
      const readoutBox = await page.locator(".readout").boundingBox();
      const fieldBox = await page.locator("#" + id).boundingBox();
      assert.ok(within(readoutBox, 320, 208), `readout must be in the 320x208 viewport while ${id} is focused: ${JSON.stringify(readoutBox)}`);
      assert.ok(within(fieldBox, 320, 208), `${id} field must be in the 320x208 viewport: ${JSON.stringify(fieldBox)}`);
      assert.ok(!overlaps(readoutBox, fieldBox), `readout and ${id} field must not overlap: ${JSON.stringify({ readoutBox, fieldBox })}`);
    }

    await assertClean(page, tracker);
  } finally {
    await context.close();
  }
});

const WORD_ROWS = [
  { bill: "", tip: "", people: "", note: "Type the bill. Each share shows here.", msgs: {}, tipAmount: "", totalAmount: "" },
  { bill: "64.50", tip: "", people: "", note: "Type the tip. Each share shows here.", msgs: {}, tipAmount: "", totalAmount: "" },
  { bill: "64.50", tip: "18", people: "", note: "Type the head count. Each share shows here.", msgs: {}, tipAmount: "11.61", totalAmount: "76.11" },
  {
    bill: "",
    tip: "18",
    people: "0",
    note: "Type the bill. Each share shows here.",
    msgs: { people: "People: enter a whole number, 1 to 999." },
    tipAmount: "",
    totalAmount: "",
  },
  {
    bill: "1.234",
    tip: "18",
    people: "3",
    note: "Fix the bill to see each share.",
    msgs: { bill: "Bill: enter an amount like 64.50, up to 999999.99." },
    tipAmount: "",
    totalAmount: "",
  },
  {
    bill: "64.50",
    tip: "101",
    people: "3",
    note: "Fix the tip to see each share.",
    msgs: { tip: "Tip: enter a whole percent, 0 to 100." },
    tipAmount: "",
    totalAmount: "",
  },
  {
    bill: "52.80",
    tip: "15",
    people: "2.5",
    note: "Fix the head count to see each share.",
    msgs: { people: "People: enter a whole number, 1 to 999." },
    tipAmount: "7.92",
    totalAmount: "60.72",
  },
  {
    bill: "1.234",
    tip: "101",
    people: "0",
    note: "Fix the bill to see each share.",
    msgs: {
      bill: "Bill: enter an amount like 64.50, up to 999999.99.",
      tip: "Tip: enter a whole percent, 0 to 100.",
      people: "People: enter a whole number, 1 to 999.",
    },
    tipAmount: "",
    totalAmount: "",
  },
];

test("the Words table: each row shows exactly its readout note and messages, no figure, readout is exactly 96px with the note inside it", async () => {
  const { context, page, tracker } = await openPage();
  try {
    await page.goto(PAGE_URL);
    for (const row of WORD_ROWS) {
      await setFields(page, row);
      await settle(page);
      const readout = await readoutState(page);
      assert.equal(readout.figureHidden, true, JSON.stringify(row));
      assert.equal(readout.noteText, row.note, JSON.stringify(row));
      assert.equal(await page.textContent("#tip-amount"), row.tipAmount, JSON.stringify(row));
      assert.equal(await page.textContent("#total-amount"), row.totalAmount, JSON.stringify(row));

      for (const name of ["bill", "tip", "people"]) {
        const field = await fieldState(page, name);
        const expected = row.msgs[name];
        if (expected) {
          assert.equal(field.msgHidden, false, `${name} message should show for ${JSON.stringify(row)}`);
          assert.equal(field.msgText, expected);
          assert.equal(field.ariaInvalid, "true");
        } else {
          assert.equal(field.msgHidden, true, `${name} message should be hidden for ${JSON.stringify(row)}`);
          assert.equal(field.ariaInvalid, null);
        }
      }

      const readoutBox = await page.locator(".readout").boundingBox();
      const noteBox = await page.locator("#each-note").boundingBox();
      assert.equal(readoutBox.height, 96, `readout must be 96px tall for ${JSON.stringify(row)}`);
      assert.ok(contains(readoutBox, noteBox), `note box must be inside the readout box for ${JSON.stringify(row)}`);
    }

    await assertClean(page, tracker);
  } finally {
    await context.close();
  }
});

test("typing 64.50 into Bill key by key with tip 18 and People 3 never flashes a Bill message", async () => {
  const { context, page, tracker } = await openPage();
  try {
    await page.goto(PAGE_URL);
    await page.fill("#tip", "18");
    await page.fill("#people", "3");
    await page.fill("#bill", "");

    const keys = ["6", "4", ".", "5", "0"];
    const expected = ["2.36", "25.18", "25.18", "25.37", "25.37"];
    const billLocator = page.locator("#bill");
    await billLocator.click();
    for (let i = 0; i < keys.length; i++) {
      await billLocator.pressSequentially(keys[i], { delay: 0 });
      const readout = await readoutState(page);
      assert.equal(readout.figureText, expected[i], `after typing ${keys.slice(0, i + 1).join("")}`);
      const bill = await fieldState(page, "bill");
      assert.equal(bill.ariaInvalid, null);
      assert.equal(bill.msgHidden, true);
    }

    await assertClean(page, tracker);
  } finally {
    await context.close();
  }
});

test("clearing fields without an input event and dispatching pageshow re-renders the empty state", async () => {
  const { context, page, tracker } = await openPage();
  try {
    await page.goto(PAGE_URL);
    await setFields(page, { bill: "100", tip: "18", people: "3" });
    let readout = await readoutState(page);
    assert.equal(readout.figureText, "39.34");

    await page.evaluate(() => {
      document.getElementById("bill").value = "";
      document.getElementById("tip").value = "";
      document.getElementById("people").value = "";
    });
    readout = await readoutState(page);
    assert.equal(readout.figureText, "39.34", "value changes without an input event must not re-render on their own");

    await page.evaluate(() => window.dispatchEvent(new Event("pageshow")));
    readout = await readoutState(page);
    assert.equal(readout.figureHidden, true);
    assert.equal(readout.noteText, "Type the bill. Each share shows here.");

    await assertClean(page, tracker);
  } finally {
    await context.close();
  }
});

test("access: lang, title, labels, tab order, aria wiring, status role, background", async () => {
  const { context, page, tracker } = await openPage();
  try {
    await page.goto(PAGE_URL);

    assert.equal(await page.evaluate(() => document.documentElement.lang), "en");
    assert.equal(await page.title(), "Tip calculator");

    await assert.doesNotReject(page.getByRole("textbox", { name: "Bill" }).waitFor());
    await assert.doesNotReject(page.getByRole("textbox", { name: "Tip %" }).waitFor());
    await assert.doesNotReject(page.getByRole("textbox", { name: "People" }).waitFor());

    await page.getByText("Bill", { exact: true }).click();
    assert.equal(await page.evaluate(() => document.activeElement.id), "bill");
    await page.getByText("Tip %", { exact: true }).click();
    assert.equal(await page.evaluate(() => document.activeElement.id), "tip");
    await page.getByText("People", { exact: true }).click();
    assert.equal(await page.evaluate(() => document.activeElement.id), "people");

    await settle(page);
    for (const id of ["bill", "tip", "people"]) {
      assert.equal(await page.getAttribute("#" + id, "autocomplete"), "off");
      const box = await page.locator("#" + id).boundingBox();
      assert.ok(box.height >= 48 - EPS, `${id} must be at least 48px tall, got ${box.height}`);
    }

    await page.focus("#bill");
    await page.keyboard.press("Tab");
    assert.equal(await page.evaluate(() => document.activeElement.id), "tip");
    await page.keyboard.press("Tab");
    assert.equal(await page.evaluate(() => document.activeElement.id), "people");

    await page.focus("#bill");
    const outline = await page.evaluate(() => {
      const style = getComputedStyle(document.getElementById("bill"));
      return { width: style.outlineWidth, styleName: style.outlineStyle, color: style.outlineColor };
    });
    assert.equal(outline.width, "2px");
    assert.equal(outline.styleName, "solid");
    assert.equal(outline.color, "rgb(20, 70, 143)");

    await setFields(page, { bill: "52.80", tip: "15", people: "2.5" });
    const describedby = await page.getAttribute("#people", "aria-describedby");
    assert.equal(describedby, "people-msg");
    assert.equal(await page.textContent("#" + describedby), "People: enter a whole number, 1 to 999.");

    await setFields(page, { bill: "100", tip: "18", people: "3" });
    const status = page.getByRole("status");
    assert.equal(await status.getAttribute("aria-atomic"), "true");
    const statusText = (await status.textContent()).replace(/\s+/g, " ").trim();
    assert.ok(statusText.includes("Each pays"), statusText);
    assert.ok(statusText.includes("39.34"), statusText);

    const readoutBg = await page.evaluate(() => getComputedStyle(document.querySelector(".readout")).backgroundColor);
    assert.equal(readoutBg, "rgb(250, 247, 238)");

    await assertClean(page, tracker);
  } finally {
    await context.close();
  }
});

test("reduced motion sets every field's transition-duration to 0s", async () => {
  const { context, page, tracker } = await openPage({ reducedMotion: "reduce" });
  try {
    await page.goto(PAGE_URL);
    for (const id of ["bill", "tip", "people"]) {
      const duration = await page.evaluate((elId) => getComputedStyle(document.getElementById(elId)).transitionDuration, id);
      const parts = duration.split(",").map((d) => d.trim());
      assert.ok(parts.length > 0 && parts.every((d) => d === "0s"), `${id} transition-duration under reduced motion: ${duration}`);
    }

    await assertClean(page, tracker);
  } finally {
    await context.close();
  }
});

test("320x208: underlying content does not cover the readout figure when People is focused", async () => {
  const { context, page, tracker } = await openPage({ viewport: { width: 320, height: 208 } });
  try {
    await page.goto(PAGE_URL);
    await setFields(page, { bill: "100", tip: "18", people: "3" });
    await page.focus("#people");
    await page.waitForTimeout(50);
    await settle(page);

    const hit = await page.evaluate(() => {
      const figure = document.getElementById("each-figure");
      const box = figure.getBoundingClientRect();
      const cx = box.x + box.width / 2;
      const cy = box.y + box.height / 2;
      const el = document.elementFromPoint(cx, cy);
      return Boolean(el && el.closest(".readout"));
    });
    assert.ok(hit, "the element at the figure's centre must be inside the readout");

    await assertClean(page, tracker);
  } finally {
    await context.close();
  }
});

test("a wider screen keeps the column at 390px", async () => {
  const { context, page, tracker } = await openPage({ viewport: { width: 768, height: 1024 } });
  try {
    await page.goto(PAGE_URL);
    await settle(page);
    const column = await page.locator(".page").boundingBox();
    assert.equal(column.x, 0);
    assert.equal(column.width, 390);

    await assertClean(page, tracker);
  } finally {
    await context.close();
  }
});
