const express = require('express');
const router = express.Router();
const staffController = require('../middleware/controllers/StaffController');


router.get('/', staffController.show);
router.get('/product', staffController.show_product);
router.get('/add-product', staffController.add_product)
      .post('/add-product', staffController.store_product);

module.exports = router;