const express = require('express');
const router = express.Router();
const managerController = require('../middleware/controllers/ManagerController');


router.get('/', managerController.show);
router.get('/dashboard', managerController.dashboard);

module.exports = router;