
const User = require('../model/Authentication');
const Products = require('../model/Products');

class SearchController {


    show(req, res, next) {
        
        Products.find({})
            .then( (products) => {
                products = products.map( product => product.toObject());
                if(req.query.product_code) {
                    products = products.filter( product => {
                        return ((product.product_code).includes(req.query.product_code));
                    })
                }

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



}

module.exports = new SearchController;
