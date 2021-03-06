const User = require('../models/User');
const LocalStrategy = require('passport-local').Strategy;

const options = {
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
};

const findUser = (req, email) => User.findOne({ $or: [{ email }, { nickname: email }] });

module.exports = (passport) => {
    passport.serializeUser((user, done) => done(null, user.email));
    passport.deserializeUser((email, done) => User.findOne({ email }).then(user => done(null, user)).catch(err => done(err)));

    passport.use('sign-up', new LocalStrategy(options, (req, email, password, done) => process.nextTick(() => findUser(req, email)
        .then(user => {
            if(user) throw new Error('That email or nickname is already taken.');
            return new User({
                email, password, nickname: req.body.nickname,
                interestedIn: req.body.interestedIn.split(/\s+/).map(s => s.trim()).filter(s => s.length)
            }).save();
        })
        .then(user => done(null, user))
        .catch(err => done(null, false, { message: err.message })))));

    passport.use('sign-in', new LocalStrategy(options, (req, email, password, done) => process.nextTick(() => findUser(req, email)
        .then(user => {
            if(user && user.check(password)) return user;
            throw new Error('Incorrect email or nickname or password.');
        })
        .then(user => done(null, user))
        .catch(err => done(null, false, { message: err.message })))));
};
