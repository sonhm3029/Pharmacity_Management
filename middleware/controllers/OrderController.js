
const User = require('../model/Authentication');
const Products = require('../model/Products');

class OrderController {


    show(req, res, next) {
        res.render('order', {layout: 'staff_layout'});
    }


}

module.exports = new OrderController;
