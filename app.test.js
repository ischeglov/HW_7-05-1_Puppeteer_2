const { clickElement, getText } = require("./lib/commands");

let page;

beforeEach(async () => {
  page = await browser.newPage();
  await page.goto("http://qamid.tmweb.ru/client/index.php");
  await page.setDefaultNavigationTimeout(60000);
});

afterEach(() => {
  page.close();
});

describe("Tests of the let's go to the cinema application", () => {
  test("Successful selection of the day and time of the movie The Witcher", async () => {
    await clickElement(page, "a:nth-child(7)");
    await clickElement(page, "[data-seance-id='223']");

    const actual = await getText(page, "h2[class='buying__info-title']");
    expect(actual).toContain("Ведьмак");
  });

  test("Successful booking of tickets for the Mickey Mouse movie", async () => {
    await clickElement(page, "a:nth-child(5)");
    await clickElement(page, "[data-seance-id='218']");
    await page.waitForSelector(".buying__info-title", {
      visible: true,
    });
    await clickElement(page, "div:nth-child(6) span:nth-child(8)");
    await clickElement(page, "div:nth-child(6) span:nth-child(9)");
    await clickElement(page, "div:nth-child(6) span:nth-child(10)");
    await clickElement(page, ".acceptin-button");

    const actual = await getText(page, ".ticket__check-title");
    expect(actual).toContain("Вы выбрали билеты:");
  });

  test("The book button should be inactive", async () => {
    jest.setTimeout(11000);
    await clickElement(page, "a:nth-child(4)");
    await clickElement(page, "[data-seance-id='199']");
    await page.waitForSelector(".buying__info-title", {
      visible: true,
    });
    await clickElement(page, "div:nth-child(2) span:nth-child(8)");

    const isDisabled = await page.$eval(".acceptin-button", (button) => {
      return button.disabled;
    });

    const actual = String(isDisabled);
    expect(actual).toContain("true");
  });
});
