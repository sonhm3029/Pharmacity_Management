const express = require('express');
const router = express.Router();
const orderController = require('../middleware/controllers/OrderController');


router.get('/', orderController.show)
      .post('/', orderController.saveInvoice);
router.get('/successed/:id', orderController.showInvoice)
      .delete('/successed/:id',orderController.deleteInvoice);
      

module.exports = router;