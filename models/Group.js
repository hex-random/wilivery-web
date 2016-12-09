const mongoose = require('mongoose');
const User = require('./User');

const schema = mongoose.Schema({
    name: { type: String, maxlength: 32, index: true, unique: true },
    admin: User, clients: [User], interestedIn: [String]
});

module.exports = mongoose.model('Group', schema);
