const puppeteer = require("puppeteer");

async function transitionTest(url, noTestPage) {
  const browser = await puppeteer.launch({
    args: ["--disable-web-security", "--no-sandbox", "--disable-setuid-sandbox"],
  });

  const options = { waitUntil: "domcontentloaded", timeout: 0 };

  const page = await browser.newPage();

  let linkList = [url];
  let allLinkList = [];
  let listExists = true;
  while (listExists) {
    let resultList = [];
    let resultLinkList = [];
    for (pageUrl of linkList) {
      await page.goto(pageUrl, options);

      // ページのaタグ取得
      const pageLinkList = await page.evaluate((pageUrl) => {
        const nodeList = document.querySelectorAll(`a`);
        const hrefList = Array.from(nodeList).map((html) => {
          return html.href;
        });
        return { pageUrl, hrefList };
      }, pageUrl);
      if (
        allLinkList.length <= 0 ||
        (!allLinkList.some((link) => link.pageUrl === pageLinkList.pageUrl) &&
          (resultList.length <= 0 || !resultList.some((result) => pageLinkList.pageUrl === result.pageUrl)))
      ) {
        resultList.push(pageLinkList);

        // すでに取得済みのリンク以外を取り出す
        let resultHrefList = pageLinkList.hrefList;
        resultHrefList.forEach((resultlink) => {
          if (
            (allLinkList.length <= 0 || !allLinkList.some((link) => link.pageUrl === resultlink)) &&
            (resultList.length <= 0 || !resultList.some((result) => resultlink === result.pageUrl))
          ) {
            resultLinkList.push(resultlink);
          }
        });
      }
    }

    // 未取得分を付け足す
    allLinkList = allLinkList.concat(resultList);
    if (resultLinkList && resultLinkList.length <= 0) {
      listExists = false;
    } else {
      linkList = resultLinkList;
    }
  }

  console.log(allLinkList);

  await browser.close();
}

(async () => {
  const url = "http://localhost:3111";
  const noTestPage = null;
  await transitionTest(url, noTestPage);
})();
