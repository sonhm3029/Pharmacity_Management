const mongoose = require('mongoose');
// const slug = require('mongoose-slug-generator');
const Schema = mongoose.Schema;

// mongoose.plugin(slug);

const User = new Schema({
    username: { type: String, required:true, unique: true},
    password: { type: String, minlength: 6, required:true}
}, {
    timestamps: true
});

module.exports = mongoose.model('authentication', User);

