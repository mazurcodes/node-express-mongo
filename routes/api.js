const News = require("../models/news");
const express = require("express");
const router = express.Router();

/* GET API page - all articles */
router.get("/", (req, res) => {
  const search = req.query.search || "";
  let sort = Number(req.query.sort) !== 1 ? -1 : 1;
  const re = new RegExp(search, "i");
  const findNews = News.find({ title: re }).sort({ date: sort });

  findNews.exec((err, data) => {
    if (err) {
      console.log("Błąd:", err);
    }
    res.json(data);
  });
});

// GET API page - one article by id
router.get("/:id", (req, res) => {
  const _id = req.params.id || "";
  const findNews = News.findById(_id);

  findNews.exec((err, data) => {
    if (err) {
      console.log("Błąd:", err);
    }
    res.json(data);
  });
});
module.exports = router;
