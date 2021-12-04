const mongoose = require('mongoose');
// const slug = require('mongoose-slug-generator');
const Schema = mongoose.Schema;

// mongoose.plugin(slug);

const Product = new Schema({

    product_name: {type: String},
    product_code: {type: String, unique:true},
    product_type: {type: String},
    product_maker: {type: String},
    product_maker_place: {type: String},
    product_brand: {type: String},
    product_description: {type: String},
    product_quantity: {type: Number},
    product_MFG: {type: Date},
    product_expired: {type: Date},
    product_price_in: {type: Number},
    product_price_out: {type: Number},
    product_img: {type: String},
    product_img_id: {type: String}
}, {
    timestamps: true
});

module.exports = mongoose.model('product', Product);

