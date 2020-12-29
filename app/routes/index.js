var express = require("express");
var router = express.Router();
const test = require("../scraping/index.js");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/test_start", (req, res, next) => {
  (async () => {
    const resultString = await test.transitionTest(req.query.url, null, req.query.hierarchy);
    res.json({ message: "complete", result: resultString });
  })().catch(next);
});

module.exports = router;
