const express = require('express');
const router = express.Router();
const staffController = require('../middleware/controllers/StaffController');


router.get('/', staffController.show);

module.exports = router;