
const User = require('../model/Authentication');
const Products = require('../model/Products');
const fs = require('fs');

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

    store_product(req, res, next) {
        const formData = req.body;

        //Add image file using multer
        // console.log(req.file.path);
        // console.log(req.file);
        // formData.product_img = '/static/' + req.file.path.split('\\').slice(1).join('/');
        //Using when deploy to heroku
        formData.product_img = '/static/' + req.file.path.split('/').slice(1).join('/');


        const newProduct = new Products(formData);
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
                product = product.toObject();
      
                res.render('edit_product', {
                    product,
                    layout:'staff_layout'
                });
            })
            .catch(next);
    }

    update_product(req, res, next) {

        const formData = req.body;

        if(req.file) {
            //if update image, delete the old one
            Products.findOne({product_code: req.params.id})
                .then(product => {
                    if(product.product_img) {
                        var old_img = 'public/' + product.product_img.split('/').slice(2).join('/');
                        fs.unlink(old_img, function (err) {
                            if (err) throw err;
                            // if no error, file has been deleted successfully
                            console.log('File deleted!');
                        });
                    }
                })
                .catch()
            //UPdate with the new one
            // formData.product_img = '/static/' + req.file.path.split('\\').slice(1).join('/');
            //Using when in heroku
            formData.product_img = '/static/' + req.file.path.split('/').slice(1).join('/');
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
        Products.deleteOne({product_code: req.params.id})
            .then(()=> {
                res.redirect('/product');
            })
            .catch(next);
    }   
}

module.exports = new ProductsController;
