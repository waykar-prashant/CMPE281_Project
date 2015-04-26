var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'ProjectTracker' });
});

router.get('/index', function(req, res, next) {
  res.render('index', { title: 'ProjectTracker' });
});

exports.index = function(req, res){
  res.render('index', { title: 'ProjectTracker' });
};

module.exports = router;
