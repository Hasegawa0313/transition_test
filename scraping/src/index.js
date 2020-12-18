const puppeteer = require("puppeteer");

async function transitionTest(url, noTestPage) {
  const browser = await puppeteer.launch({
    args: ["--disable-web-security", "--no-sandbox", "--disable-setuid-sandbox"],
    headless: false,
  });

  this.options = { waitUntil: "domcontentloaded", timeout: 0 };

  await page.goto(url, this.options);

  const linkList = await page.evaluate(() => {
    const nodeList = document.querySelectorAll(`a`);
    const hrefList = Array.from(nodeList).map((html) => {
      return html.href;
    });
    return hrefList;
  });

  console.log(linkList);

  const page = await browser.newPage();
  await browser.close();
}

async () => {
  const url = "";
  const noTestPage = null;
  await transitionTest(url, noTestPage);
};
