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
  // const news = new News({
  //   title: 'To jest nowy artykuł',
  //   body: 'To jest body nowego artykułu'
  // });
  // news.save( (err) => {
  //   console.log(err);
  // });

  res.render("admin/index", { title: "Admin" });
});

router.get("/news/add", (req, res) => {
  res.render("admin/news-form", { title: "Add news" });
});

router.post("/news/add", (req, res) => {
  const {title, body} = req.body;
  console.log(title, body);
})

module.exports = router;
