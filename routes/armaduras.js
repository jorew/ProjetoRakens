var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('equip/armaduras');
});

router.get('/1encantamentos', (req, res) => {
  res.render('equip/1encantamentos');
});

router.get('/2punicao', (req, res) => {
  res.render('equip/2punicao');
});









module.exports = router;
