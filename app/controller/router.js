const express = require('express');
const router = express.Router();
const controller = require('./controller');
const path = require('path');

router.get('/', function(req, res, next) {
  res.sendFile(path.join(__dirname, "../../view", "index.html"));
});

router.get('/warranty/last-12-month', controller.getDataForTheLast12Month);
router.get('/warranty/current-month', controller.getDataForTheCurrentMonth);
router.get('/warranty/date-selection', controller.getDataAccordingToDateSelection);
router.post('/warranty/add-entry', controller.addWarrantyEntry);
router.post('/warranty/delete-entry', controller.deleteWarrantyEntry);



module.exports = router;
