const handlebars = require('express-handlebars');


function sum(a,b) {
    return a + b;
}

function Int(str_data) {
    return Number(str_data);
}

function typeOf(data){
    return typeof(data);
}



function product_index(a,b,c) {
   c = Number(c);
    return a + b + (c-1)*20;
}

function getDate(product_time) {
    var newDate = product_time.getDate();
    if(newDate <10) {
        newDate = '0' + newDate;
    }
    return newDate;
}
function getMonth(product_time) {
    var newMonth = product_time.getMonth() + 1;
    if(newMonth <10) {
        newMonth = '0' + newMonth;
    }
    return newMonth;
}
function getYear(product_time) {
    return product_time.getFullYear();
}

function getYMD(product_time) {
    var date_str = '';
    var year = String(getYear(product_time));
    var month = String(getMonth(product_time));
    var date = String(getDate(product_time));

    date_str += year + '-' + month + '-' + date;
    return date_str;
}

function calculate_price(product_quantity, product_price) {
    return Number(product_quantity)*Number(product_price);
}



function hbsHelper(app) {

    app.engine('hbs', handlebars({
        extname: '.hbs',
        helpers: {
            sum,
            getMonth,
            getDate,
            getYear,
            product_index,
            Int,
            typeOf,
            getYMD,
            calculate_price
        }
    }));
    
    app.set('view engine', 'hbs');
}

module.exports = hbsHelper;
