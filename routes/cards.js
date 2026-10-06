var express = require('express')
var router = express.Router()

router.get('/', function(req, res, next) {
  res.render('cards')
  })

  module.exports = router;