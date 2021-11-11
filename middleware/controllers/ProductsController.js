
const User = require('../model/Authentication');
const Products = require('../model/Products');

class ProductsController {


    show_product(req, res, next) {
        Products.find({})
            .then( (products) => {
                products = products.map( product => product.toObject());
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
        Products.updateOne({product_code: req.params.id}, req.body)
            .then(()=> {
                res.redirect('/product');
            })
            .catch( error => {
                res.redirect(req.get('referer'));
            });
    }
}

module.exports = new ProductsController;
