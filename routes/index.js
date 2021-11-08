const login = require('./login');
const dashboard = require('./dashboard');
const manager = require('./manager');
const staff = require('./staff');


function route(app) {

    app.use('/manager', manager);
    app.use('/staff', staff);
    app.use('/', login);
    
}


module.exports = route;
