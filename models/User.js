const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');

const schema = mongoose.Schema({
    email: { type: String, index: true, unique: true },
    password: { type: String, set: bcryptjs.hashSync },
    interestedIn: [String]
});

module.exports = mongoose.model('User', schema);
