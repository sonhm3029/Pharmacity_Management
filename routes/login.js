const express = require('express');
const router = express.Router();
const loginController = require('../middleware/controllers/LoginController');


router.get('/', loginController.index);

module.exports = router;