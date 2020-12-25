var express = require("express");
var router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
  // res.send("respond with a resource");
  res.render("users", "");
});

router.get("/:userId", function (req, res, next) {
  // res.send("respond with a resource");
  res.render(`user`, req.params);
});

module.exports = router;
