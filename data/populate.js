const User = require('../models/User');
const Article = require('../models/Article');

module.exports = () => {
    User.count({}).then(count => count || User.insertMany(require('./users')).then(() => console.log('Populated User models')));
    Article.count({}).then(count => count || Article.insertMany(require('./articles')).then(() => console.log('Populated Article models')));
};
