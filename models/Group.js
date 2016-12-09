const mongoose = require('mongoose');

const schema = mongoose.Schema({
    name: { type: String, maxlength: 32, index: true, unique: true },
    admin: { type: String, index: true }, clients: [String], interestedIn: [String]
});

module.exports = mongoose.model('Group', schema);
