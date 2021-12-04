const mongoose = require('mongoose');
// const slug = require('mongoose-slug-generator');
const Schema = mongoose.Schema;

// mongoose.plugin(slug);

const Staff = new Schema({

    staff_code: {type: String, unique:true},
    staff_name: {type: String},
    staff_gender: {type: String},
    staff_birthday: {type: Date},
    staff_address: {type: String},
    staff_email: {type: String},
    staff_phone: {type: String},
    staff_img: {type: String},
    staff_img_id: {type: String}
}, {
    timestamps: true
});

module.exports = mongoose.model('staff', Staff);

