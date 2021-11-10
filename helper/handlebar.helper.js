const handlebars = require('express-handlebars');


function sum(a,b) {
    return a + b;
}

function getDate(product_time) {
    return product_time.getDate();
}
function getMonth(product_time) {
    return product_time.getMonth() + 1;
}
function getYear(product_time) {
    return product_time.getFullYear();
}

function hbsHelper(app) {

    app.engine('hbs', handlebars({
        extname: '.hbs',
        helpers: {
            sum,
            getMonth,
            getDate,
            getYear
        }
    }));
    
    app.set('view engine', 'hbs');
}

module.exports = hbsHelper;
