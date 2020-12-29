const puppeteer = require("puppeteer");

exports.transitionTest = async function transitionTest(url, noTestPage, times) {
  const browser = await puppeteer.launch({
    args: ["--disable-web-security", "--no-sandbox", "--disable-setuid-sandbox"],
  });

  const options = { waitUntil: "domcontentloaded", timeout: 0 };

  const page = await browser.newPage();

  let linkList = [url];
  let allLinkList = [];
  let listExists = true;
  let i = 0;
  while (listExists) {
    let resultList = [];
    let resultLinkList = [];
    for (pageUrl of linkList) {
      await page.goto(pageUrl, options).catch((e) => {
        console.error(error);
      });

      // page.on("console", (consoleObj) => {
      //   console.log(consoleObj.text());
      // });

      // ページのaタグ取得
      const pageLinkList = await page.evaluate((pageUrl) => {
        const nodeList = document.querySelectorAll(`a`);
        const hrefList = Array.from(nodeList).map((html) => {
          return { hrefList: html.href, text: html.textContent };
        });
        console.log(JSON.stringify(hrefList));
        return { pageUrl: pageUrl, hrefList: hrefList };
      }, pageUrl);
      if (
        allLinkList.length <= 0 ||
        (!allLinkList.some((link) => link.pageUrl === pageLinkList.pageUrl) &&
          (resultList.length <= 0 || !resultList.some((result) => pageLinkList.pageUrl === result.pageUrl)))
      ) {
        resultList.push(pageLinkList);
        console.log(pageLinkList);

        // すでに取得済みのリンク以外を取り出す
        let resultHrefList = pageLinkList.hrefList;
        console.log(resultHrefList);
        resultHrefList.forEach((resultlink) => {
          if (
            (allLinkList.length <= 0 || !allLinkList.some((link) => link.pageUrl === resultlink.hrefList)) &&
            (resultList.length <= 0 || !resultList.some((result) => resultlink.hrefList === result.pageUrl))
          ) {
            resultLinkList.push(resultlink.hrefList);
          }
        });
      }
    }

    // 未取得分を付け足す
    allLinkList = allLinkList.concat(resultList);
    if ((resultLinkList && resultLinkList.length <= 0) || (times && times == i)) {
      listExists = false;
    } else {
      linkList = resultLinkList;
    }
    i++;
  }

  console.log(allLinkList);
  let resultString = "";

  // リンクがつながっているかどうかをテストする
  for (const testLink of allLinkList) {
    resultString = `${resultString}***************** ${testLink.pageUrl} *****************\n`;
    await page.goto(testLink.pageUrl, options).catch((error) => {
      console.log(error);
    });

    for (const testHref of testLink.hrefList) {
      // const response = await page.goto(testHref, options).catch((error) => {
      //   console.log(error);
      // });
      const response = await page.goto(testHref.hrefList, options).catch((error) => {
        console.log(error);
      });
      let result = null;
      if (response) {
        result = response._status;
      }

      if (!/^4\d*$/.test(result) && !/^5\d*$/.test(result)) {
        resultString = `${resultString}OK status:${result} page:${testLink.pageUrl} text:${testHref.text} URL:${testHref.hrefList}\n`;
      } else {
        resultString = `${resultString}error! status:${result} page:${testLink.pageUrl} text:${testHref.text} URL:${testHref.hrefList}\n`;
      }
    }
    resultString = resultString + "\n";
  }

  await browser.close();
  return resultString;
};

// (async () => {
//   const url = "http://localhost:3111";
//   const noTestPage = null;
//   await transitionTest(url, noTestPage);
// })();
