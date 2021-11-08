const login = require('./login');
const dashboard = require('./dashboard');

function route(app) {

    app.use('/login', login);
    app.use('/', dashboard);
    
}


module.exports = route;
