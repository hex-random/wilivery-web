const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
    author: String,
    content: { type: String, maxlength: 512 },
    date: { type: Date, default: Date.now }
}, { _id: false });

const schema = mongoose.Schema({
    title: { type: String, maxlength: 128, index: true },
    author: { type: String, index: true },
    date: { type: Date, default: Date.now, index: true },
    content: { type: String, maxlength: 2048 },
    category: [String], comments: [commentSchema]
});

schema.statics.findByAuthor = function(author){
    return this.find({ author }).sort('-date').exec();
};

module.exports = mongoose.model('Article', schema);
