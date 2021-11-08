const login = require('./login');
const dashboard = require('./dashboard');
const manager = require('./manager');
const staff = require('./staff');

function route(app) {

    app.use('/login', login);
    app.use('/manager', manager);
    app.use('/staff', staff);
    
}


module.exports = route;
