var express = require('express');
var router = express.Router();

var config = require('../config');


router.get('/:id', (req, res) => {
  res.json({
    body: req.body,
    query: req.query,
    params: req.params,
    headers: req.headers,
  });
});


module.exports = router;
