const passport = require('passport');

module.exports = (app) => {
    app.get('/', (req, res, next) => res.render('pages/index'));
    
    app.get('/sign-in', (req, res, next) => res.render('pages/sign-in'));
    app.post('/sign-in', passport.authenticate('sign-in', {
        successRedirect: '/',
        failureRedirect: '/sign-in'
    }));
};
