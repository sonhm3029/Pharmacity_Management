const login = require('./login');
const dashboard = require('./dashboard');
const manager = require('./manager');
const staff = require('./staff');
const products = require('./product');
const search = require('./search');

const authMiddleware = require('../middleware/auth.middleware');


function route(app) {

    app.use('/manager',authMiddleware.requireManagerRole, manager);
    app.use('/staff',authMiddleware.requireStaffRole, staff);
    app.use('/product',authMiddleware.requireStaffRole, products);
    app.use('/search',authMiddleware.requireStaffRole,search);
    app.use('/', login);
    
}


module.exports = route;
