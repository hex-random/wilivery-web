const validation = require('../app/validation');
const isAuthenticated = (req, res, next) => req.isAuthenticated() ? next() : res.redirect('/');
const isNotAuthenticated = (req, res, next) => !req.isAuthenticated() ? next() : res.redirect('/');

module.exports = (app, passport) => {
    app.use((req, res, next) => {
        res.locals.user = req.user;
        next();
    });

    app.get('/', (req, res, next) => res.render('pages/index'));

    app.get('/sign-in', isNotAuthenticated, (req, res, next) => res.render('pages/sign-in', { errors: req.flash('error') }));
    app.post('/sign-in', validation.validateSignIn, passport.authenticate('sign-in', {
        successRedirect: '/',
        failureRedirect: '/sign-in',
        failureFlash: true
    }));

    app.get('/sign-up', isNotAuthenticated, (req, res, next) => res.render('pages/sign-up', { errors: req.flash('error') }));
    app.post('/sign-up', validation.validateSignUp, passport.authenticate('sign-up', {
        successRedirect: '/',
        failureRedirect: '/sign-up',
        failureFlash: true
    }));

    app.get('/sign-out', isAuthenticated, (req, res) => {
        req.logout();
        res.redirect('/');
    });

    app.use((req, res, next) => {
        let err = new Error('Not Found');
        err.status = 404; next(err);
    });


    app.use((err, req, res, next) => {
        res.status(err.status || 500);
        res.render('pages/error', { message: err.message, error: err });
    });
};
