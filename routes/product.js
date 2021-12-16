const express = require('express');
const router = express.Router();
const productController = require('../middleware/controllers/ProductsController');

//Upload file module
// const multer = require('multer');
// const upload = multer({ dest: './public/img/product_imgs/'})
const upload = require('../middleware/multer');

router.get('/product-management', productController.show_product);

      
router.get('/add', productController.add_product)
      .post('/add',upload.single('product_img'), productController.store_product);
router.get('/product-management/:id/edit',productController.edit_product)
      .put('/product-management/:id',upload.single('product_img'),productController.update_product)
      .delete('/product-management/:id', productController.delete_product);

module.exports = router;