var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('equip/armaduras');
});

router.get('/1encantamentos', (req, res) => {
  res.render('equip/1encantamentos');
});











module.exports = router;
