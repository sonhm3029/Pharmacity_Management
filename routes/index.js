const login = require('./login');
const dashboard = require('./dashboard');
const manager = require('./manager');
const staff = require('./staff');
const products = require('./product');
const search = require('./search');
const order = require('./order');
const error = require('../middleware/error_handling');

const authMiddleware = require('../middleware/auth.middleware');


function route(app) {

    app.use('/manager',authMiddleware.requireManagerRole, manager,error);
    app.use('/staff',authMiddleware.requireStaffRole, staff,error);
    app.use('/product',authMiddleware.requireStaffRole, products,error);
    app.use('/search',authMiddleware.requireStaffRole,search,error);
    app.use('/order',authMiddleware.requireStaffRole, order,error );
    app.use('/', login);
    app.use(error);
}


module.exports = route;
