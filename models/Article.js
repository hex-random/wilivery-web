const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
    author: String,
    content: { type: String, maxlength: 512 },
    date: { type: Date, default: Date.now }
}, { _id: false });

const schema = mongoose.Schema({
    title: { type: String, maxlength: 128, index: true },
    author: { type: String, index: true }, group: { type: String, index: true },
    content: { type: String, maxlength: 2048 }, comments: [commentSchema],
    category: [String], date: { type: Date, default: Date.now, index: true },
});

module.exports = mongoose.model('Article', schema);
