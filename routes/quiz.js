const express = require('express');
const router = express.Router();
const Quiz = require('../models/quiz');

/* GET home page. */
router.get('/', (req, res) => {
  Quiz.find({}, (err, data) => {
    res.render('quiz', { title: 'Quiz', data});
  })
});

router.post('/', (req, res) => {
  const _id = req.body.quiz;
  Quiz.findOne({_id}, (err, data) => {
    data.vote += 1;
    data.save(() => {
      res.redirect('/quiz');
    });
  });
})

module.exports = router;