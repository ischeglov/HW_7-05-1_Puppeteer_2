const puppeteer = require("puppeteer");
const chai = require("chai");
const expect = chai.expect;
const {
  Given,
  When,
  Then,
  Before,
  After,
  setDefaultTimeout,
} = require("cucumber");
const { clickElement, getText } = require("../../lib/commands");

setDefaultTimeout(60000);
Before(async function () {
  const browser = await puppeteer.launch({ headless: false, slowMo: 5000 });
  const page = await browser.newPage();
  this.browser = browser;
  this.page = page;
});

After(async function () {
  if (this.browser) {
    await this.browser.close();
  }
});

Given("user is on main page", async function () {
  return await this.page.goto(`http://qamid.tmweb.ru/client/index.php`, {
    setTimeout: 30000,
  });
});

When(
  "user chooses the day and the time of the session",
  { setTimeout: 30000 },
  async function () {
    await clickElement(this.page, "a:nth-child(7)");
    await clickElement(this.page, '[data-seance-id="223"]');
  }
);

Then(
  "the page displays the title of the movie {string}",
  async function (string) {
    const actual = await getText(this.page, 'h2[class="buying__info-title"]');
    const expected = await string;
    expect(actual).contains(expected);
  }
);

When(
  "user click the day and the time of the session",
  { setTimeout: 30000 },
  async function () {
    await clickElement(this.page, "a:nth-child(5)");
    await clickElement(this.page, '[data-seance-id="218"]');
  }
);

When("user book the several tickets", async function () {
  await clickElement(this.page, "div:nth-child(6) span:nth-child(8)");
  await clickElement(this.page, "div:nth-child(6) span:nth-child(9)");
  await clickElement(this.page, "div:nth-child(6) span:nth-child(10)");
});

Then("sees the title {string}", async function (string) {
  const actual = await getText(this.page, ".ticket__check-title");
  const expected = await string;
  expect(actual).contains(expected);
});

When(
  "user click the day and the time",
  { setTimeout: 30000 },
  async function () {
    await clickElement(this.page, "a:nth-child(4)");
    await clickElement(this.page, '[data-seance-id="199"]');
  }
);

When("the user has reserved a seat that is already occupied", async function () {
  return await clickElement(this.page, "div:nth-child(2) span:nth-child(8)");
});

Then("the book button should be inactive", async function () {
  const isDisabled = await page.$eval(".acceptin-button", (button) => {
    return button.disabled;
  });
  const actual = String(isDisabled);
  expect(actual).contains("true");
});
