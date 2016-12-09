function validateSignUp(req, res, next){
    req.checkBody('email', 'Email must be a valid e-mail').isEmail();
    req.checkBody('password', 'Password must be at least 8 characters').isLength({ min: 8 });
    req.checkBody('confirm', 'Confirm password must match password field').equals(req.body.password);
    req.checkBody('nickname', 'Nickname must be at least 2 characters').isLength({ min: 2 });
    req.checkBody('nickname', 'Nickname cannot be longer than 2 characters').isLength({ max: 32 });

    let errors = req.validationErrors();
    if(!errors) return next();

    req.flash('error', errors.map(e => e.msg));
    res.redirect('/sign-up');
}

function validateSignIn(req, res, next){
    req.checkBody('password', 'Password must be at least 8 characters').isLength({ min: 8 });

    let errors = req.validationErrors();
    if(!errors) return next();

    req.flash('error', errors.map(e => e.msg));
    res.redirect('/sign-in');
}

function validateWrite(req, res, next){
    req.checkBody('title', 'Title must be at least 2 characters').isLength({ min: 2 });
    req.checkBody('title', 'Title cannot be longer than 128 characters').isLength({ max: 128 });
    req.checkBody('content', 'Content must be at least 3 characters').isLength({ min: 3 });
    req.checkBody('content', 'Content cannot be longer than 2048 characters').isLength({ max: 2048 });
    req.checkBody('tags', 'Tags cannot be longer than 64 characters').isLength({ max: 64 });

    let errors = req.validationErrors();
    if(!errors) return next();

    req.flash('error', errors.map(e => e.msg));
    res.redirect('/write');
}

module.exports = {
    validateSignUp,
    validateSignIn,
    validateWrite
};
