const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const Schema = mongoose.Schema;

mongoose.plugin(slug);

const Report = new Schema({
    staff_code: {type:String},
    report_date: {type:Date},
    report_files: {type:Array},
    report_type:{type: String},
    report_link: { type: String, slug:'report_date', unique: true},
    report_note: {type: String},
    report_name: {type:String}
}, {
    timestamps: true
});

module.exports = mongoose.model('report', Report);

