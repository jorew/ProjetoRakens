var express = require('express')
var router = express.Router()

router.get('/', function(req, res, next) {
  res.render('canticos')
  })

  module.exports = router;