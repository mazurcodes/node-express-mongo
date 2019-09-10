const express = require("express");
const News = require("../models/news");
const router = express.Router();

router.all("*", (req, res, next) => {
  if (!req.session.admin) {
    res.redirect("login");
    return;
  }
  next();
});

/* GET home page. */
router.get("/", (req, res) => {
  res.render("admin/index", { title: "Admin" });
});

router.get("/news/add", (req, res) => {
  res.render("admin/news-form", { title: "Add news", status: false, body: {} });
});

router.post("/news/add", (req, res) => {
  const body = req.body;
  const news = new News(body);
  const errors = news.validateSync();

  news.save( (err) => {
    if (err) {
      res.render("admin/news-form", { title: "Add news", status: true, errors, body });
    }
    res.redirect('/admin');
  });
})

module.exports = router;
