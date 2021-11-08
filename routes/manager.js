const express = require('express');
const router = express.Router();
const managerController = require('../middleware/controllers/ManagerController');


router.get('/', managerController.show);

module.exports = router;