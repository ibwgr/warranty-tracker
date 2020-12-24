const express = require('express');
const router = express.Router();
const path = require('path');
const db = require('../database/db-connection.js')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile(path.join(__dirname, "../../public", "index.html"));
});

db.testData();

module.exports = router;
