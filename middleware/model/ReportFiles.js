const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const Schema = mongoose.Schema;

mongoose.plugin(slug);

const ReportFiles = new Schema({
    url: {type: String, unique: true},
    id: {type: String, unique: true},
    report_link: {type: String},
}, {
    timestamps: true
});

module.exports = mongoose.model('report_file', ReportFiles);

