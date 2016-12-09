const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');

const schema = mongoose.Schema({
    email: { type: String, index: true, unique: true },
    password: { type: String, set: p => bcryptjs.hashSync(p) },
    nickname: { type: String, index: true, unique: true },
    interestedIn: [String]
});

schema.methods.check = function(password){
    return bcryptjs.compareSync(password, this.password);
};

module.exports = mongoose.model('User', schema);
