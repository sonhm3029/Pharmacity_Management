
const User = require('../model/Authentication');
const Products = require('../model/Products');
const fs = require('fs');
const cloudinary = require('../cloudinary');

function deleteTempImg(path) {
    fs.unlink(path, function (err) {
        console.log(path);
        if (err) throw err;
        // if no error, file has been deleted successfully
        console.log('Temp File deleted!');
    });
}

class ProductsController {


    show_product(req, res, next) {
        Products.find({})
            .then( (products) => {
                products = products.map( product => product.toObject());
                // Product filter type
                if(req.query.product_type) {
                    products = products.filter( product => {
                        return product.product_type == req.query.product_type;
                    })  
                }

                // Make pagination
                var page_index = [];
                for(var i = 1; i<= Math.ceil((products.length)/20); i++) {
                    page_index.push(i);
                }
                let page_number = (req.query.page) ||1;
                const product_perpage = 20;

                products = products.slice((page_number-1)*product_perpage, (page_number-1)*product_perpage + product_perpage );
                res.locals.page_number = page_number;

                res.render('product_manage', {
                    products,
                    page_index,
                    layout: 'staff_layout'
                });
            })
            .catch(next);
    }


    add_product(req, res, next) {
        res.render('create_product', {layout: 'staff_layout'});
    }

    async store_product(req, res, next) {
        const formData = req.body;

        //Add image file to cloudinary using multer
        const result_img = await cloudinary.v2.uploader.upload(req.file.path, {folder: "products"});
        formData.product_img = result_img.secure_url;
        formData.product_img_id = result_img.public_id;

        const newProduct = new Products(formData);

        //Delete temp file save by multer
        deleteTempImg(req.file.path); 

        newProduct.save()
            .then(()=> {
                res.redirect('/staff/product');
            })
            .catch((error)=> {
                const oldData = formData;
                res.render('create_product',
                {
                    layout:'staff_layout',
                    errors: ['Mã sản phẩm đã tồn tại !'],
                    oldData
                })
            });
    }

    edit_product(req, res, next) {
        Products.findOne({product_code: req.params.id})
            .then( product => {
                if(product) {
                    product = product.toObject();
      
                    res.render('edit_product', {
                        product,
                        layout:'staff_layout'
                    });
                }
                else {
                    next();
                }
            })
            .catch(next);
    }

    async update_product(req, res, next) {

        const formData = req.body;

        if(req.file) {
            //if update image, delete the old one
            Products.findOne({product_code: req.params.id})
                .then(product => {
                    if(product.product_img&&product.product_img_id) {
                        
                        cloudinary.v2.uploader.destroy(product.product_img_id,
                            function(result) {
                                console.log(result);
                            })
                    }
                })
                .catch(next)
            //UPdate with the new one
            const new_img = await cloudinary.v2.uploader.upload(req.file.path, {folder: "products"});
            formData.product_img = new_img.secure_url;
            formData.product_img_id = new_img.public_id;
            // Delete temp file
            deleteTempImg(req.file.path);
        }

        Products.updateOne({product_code: req.params.id}, formData)
            .then(()=> {
                res.redirect('/product');
            })
            .catch( error => {
                res.redirect(req.get('referer'));
            });
    }

    delete_product(req, res, next) {
        Products.findOneAndDelete({product_code: req.params.id})
            .then((product)=> {
                if(product.product_img&&product.product_img_id) {
                    cloudinary.v2.uploader.destroy(product.product_img_id,
                        function(result) {
                            console.log(result);
                        })
                }
                res.redirect('/product');
            })
            .catch(next);
    }   
}

module.exports = new ProductsController;
