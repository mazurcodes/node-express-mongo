const express = require("express");
const router = express.Router();
const Quiz = require("../models/quiz");

/* GET home page. */
router.get("/", (req, res) => {
  const show = !req.session.vote;
  Quiz.find({}, (err, data) => {
    const votesTotal = data.reduce((total, item) => total + item.vote, 0);
    res.render("quiz", { title: "Quiz", data, show, votesTotal });
  });
});

router.post("/", (req, res) => {
  const _id = req.body.quiz;
  if (_id) {
    Quiz.findOne({ _id }, (err, data) => {
      data.vote += 1;
      req.session.vote = 1;
      data.save(() => {
        res.redirect("/quiz");
      });
    })
  } else {
    res.redirect("/quiz");
  }
});

module.exports = router;
