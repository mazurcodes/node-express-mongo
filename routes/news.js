const News = require("../models/news");
const express = require("express");
const router = express.Router();

/* GET home page. */
router.get("/", (req, res) => {
  const search = req.query.search ? req.query.search.trim() : ""; // prevents searching with spaces
  const re = new RegExp(search, "i");
  const findNews = News.find({ title: re }).sort({ title: "asc" });

  findNews.exec((err, data) => {
    if (err) {
      console.log("Błąd:", err);
    }
    res.render("news", { title: "News", data, search });
  });
});

module.exports = router;
