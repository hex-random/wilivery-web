const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');

const Article = require('./Article');
const ObjectId = mongoose.Types.ObjectId;

const schema = mongoose.Schema({
    email: { type: String, index: true, unique: true },
    password: { type: String, set: p => bcryptjs.hashSync(p) },
    nickname: { type: String, maxlength: 32, index: true, unique: true },
    interestedIn: [String], recentlyCommentedArticles: [String]
});

schema.methods.check = function(password){
    return bcryptjs.compareSync(password, this.password);
};

schema.methods.leaveComment = function(req){
    return Article.findByIdAndUpdate(
        { _id: ObjectId(req.params.article) },
        { $push: { comments: {
            author: req.user.nickname,
            content: req.body.content
        } } }).then(article => {
            if(this.recentlyCommentedArticles.unshift(article._id) > 20)
                this.recentlyCommentedArticles = this.recentlyCommentedArticles.slice(20);

            return this.save();
        });
};

schema.methods.getRecentlyCommentedArticles = function(){
    return Promise.map(this.recentlyCommentedArticles, articleId => Article.findById(ObjectId(articleId)));
};

module.exports = mongoose.model('User', schema);
