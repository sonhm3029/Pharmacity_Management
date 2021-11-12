const express = require('express');
const router = express.Router();
const orderController = require('../middleware/controllers/OrderController');


router.get('/', orderController.show);

      

module.exports = router;