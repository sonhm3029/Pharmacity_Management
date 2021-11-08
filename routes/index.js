const login = require('./login');
const dashboard = require('./dashboard');
const manager = require('./manager');
const staff = require('./staff');

const authMiddleware = require('../middleware/auth.middleware');


function route(app) {

    app.use('/manager',authMiddleware.requireAuth, manager);
    app.use('/staff', staff);
    app.use('/', login);
    
}


module.exports = route;
