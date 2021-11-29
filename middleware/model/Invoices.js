const mongoose = require('mongoose');
// const slug = require('mongoose-slug-generator');
const Schema = mongoose.Schema;

// mongoose.plugin(slug);

const Invoice = new Schema({

    invoice_code: {type: String, unique:true},
    invoice_staff_name: {type: String},
    customer_name: {type: String},
    customer_email: {type: String},
    customer_phone: {type: String},
    customer_address: {type: String},
    invoice_date: {type: Date},
    customer_birth: {type: Date},
    customer_pay: {type: Number},
    customer_pay_back: {type: Number},
    invoice_cost: {type: Number},
    list_products: {type: Array},
    invoice_status: {type: String}
}, {
    timestamps: true
});

module.exports = mongoose.model('order', Invoice);

