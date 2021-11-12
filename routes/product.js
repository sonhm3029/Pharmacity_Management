const express = require('express');
const router = express.Router();
const productController = require('../middleware/controllers/ProductsController');


router.get('/', productController.show_product);

      
router.get('/add', productController.add_product)
      .post('/add', productController.store_product);
router.get('/:id/edit', productController.edit_product)
      .put('/:id', productController.update_product)
      .delete('/:id', productController.delete_product);

module.exports = router;