const login = require('./login');

function route(app) {

    app.use('/login', login);
    
}


module.exports = route;
