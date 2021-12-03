const express = require('express');
const router = express.Router();
const productController = require('../middleware/controllers/ProductsController');

//Upload file module
const multer = require('multer');
const upload = multer({ dest: './public/img/product_imgs/'})

router.get('/', productController.show_product);

      
router.get('/add', productController.add_product)
      .post('/add',upload.single('product_img'), productController.store_product);
router.get('/:id/edit',productController.edit_product)
      .put('/:id',upload.single('product_img'),productController.update_product)
      .delete('/:id', productController.delete_product);

module.exports = router;