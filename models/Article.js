const mongoose = require('mongoose');

const schema = mongoose.Schema({
    title: { type: String, maxlength: 32, index: true },
    author: { type: String, index: true }, group: { type: String, index: true },
    content: String, category: [String], date: { type: Date, default: Date.now, index: true }
});

module.exports = mongoose.model('Article', schema);
