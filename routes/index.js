const isAuthenticated = (req, res, next) => req.isAuthenticated() ? next() : res.redirect('/');
const isNotAuthenticated = (req, res, next) => !req.isAuthenticated() ? next() : res.redirect('/');

const Article = require('../models/Article');
const validation = require('../app/validation');

module.exports = (app, passport) => {
    app.use((req, res, next) => {
        res.locals.user = req.user;
        res.locals.jail = 'jail' in req.query;
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

    app.get('/write', isAuthenticated, (req, res) => res.render('pages/write', { errors: req.flash('error') }));
    app.post('/write', isAuthenticated, validation.validateWrite, (req, res, next) => Article.create(req)
        .then(() => res.redirect('/')).catch(err => next(err)));

    app.get('/profile', isAuthenticated, (req, res) => res.render('pages/profile'));
    app.get('/history', isAuthenticated, (req, res, next) => res.render('pages/history'));

    app.get('/api/recently-commented-articles', isAuthenticated, (req, res, next) => req.user.getRecentlyCommentedArticles()
        .then(articles => res.json(articles)).catch(() => res.send(500)));


    app.get('/api/recent-articles', (req, res, next) => Article.find()
        .sort('-date').limit(20).exec()
        .then(articles => res.json(articles))
        .catch(() => res.send(500)));

    app.get('/api/get-articles/:nickname', (req, res, next) => Article.findByAuthor(req.params.nickname)
        .then(articles => res.json(articles)).catch(() => res.send(500)));

    app.post('/api/leave-comment/:article', isAuthenticated, validation.validateLeaveComment,
        (req, res, next) => req.user.leaveComment(req).then(() => res.redirect('/')).catch(err => next(err)));

    app.use((req, res, next) => {
        let err = new Error('Not Found');
        err.status = 404; next(err);
    });

    app.use((err, req, res, next) => {
        res.status(err.status || 500);
        res.render('pages/error', { message: err.message, error: err });
    });
};
