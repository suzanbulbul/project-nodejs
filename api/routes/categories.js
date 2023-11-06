var express = require('express');
var router = express.Router();

var config = require('../config');

router.get('/:id', (req, res) => {
  res.json({succes: true})
});

module.exports = router;
