const mongoose = require('mongoose');
// const slug = require('mongoose-slug-generator');
const Schema = mongoose.Schema;

// mongoose.plugin(slug);

const InvoiceDetails = new Schema({
    invoice_code: {type: String},
    product_code: {type: String},
    invoice_product_quantity: {type: Number},
    invoice_product_total: {type: Number}
}, {
    timestamps: true
});

module.exports = mongoose.model('order_detail', InvoiceDetails);

