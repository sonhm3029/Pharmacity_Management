const express = require('express');
const router = express.Router();
const dashboardController = require('../middleware/controllers/DashboardController');


router.get('/', dashboardController.index);

module.exports = router;