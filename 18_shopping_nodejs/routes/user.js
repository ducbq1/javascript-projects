var express = require('express');
var router = express.Router();
var csrf = require('csurf');
var passport = require('passport')
const { body, validationResult } = require('express-validator');

var csrfProtection = csrf();
router.use(csrfProtection);

router.get('/profile', isLoggedIn, function (req, res, next) {
  res.render('user/profile');
});

router.get('/logout', isLoggedIn, function (req, res, next) {
  req.logout();
  // req.session.cart = {};
  req.session.cart = null;
  res.redirect('/');
})

router.use('/', notLoggedIn, function (req, res, next) {
  next();
})

router.get('/signup', function (req, res, next) {
  var messages = req.flash('error');
  res.render('user/signup', { csrfToken: req.csrfToken(), messages: messages, hasErrors: messages.length > 0 })
});

router.post('/signup',
  body('email', 'Invalid Email').isEmail(),
  body('password', 'Short Password').isLength({ min: 3 }), (req, res, next) => {
    const errs = validationResult(req);
    console.log(errs.array())
    if (!errs.isEmpty()) {
      var messages = [];
      errs.array().forEach(function (error) {
        messages.push(error.msg);
      });
      req.flash('error', messages);
      res.redirect('/user/signup');
    } else {
      next();
    }
  },

  passport.authenticate('local.signup', {
    successRedirect: '/user/profile',
    failureRedirect: '/user/signup',
    failureFlash: true
  })
);

// (err, req, res, next)

router.get('/signin', function (req, res, next) {
  var messages = req.flash('error');
  res.render('user/signin', { csrfToken: req.csrfToken(), messages: messages, hasErrors: messages.length > 0 })
});

router.post('/signin',
  // body('email', 'Invalid Email').isEmail(),
  // body('password', 'Short Password').isLength({ min: 3 }), (req, res, next) => {
  //   const errs = validationResult(req);
  //   console.log(errs.array())
  //   if (!errs.isEmpty()) {
  //     var messages = [];
  //     errs.array().forEach(function (error) {
  //       messages.push(error.msg);
  //     });
  //     req.flash('error', messages);
  //     res.redirect('/user/signup');
  //   } else {
  //     next();
  //   }
  // },
  passport.authenticate('local.signin', {
    // successRedirect: '/user/profile',
    failureRedirect: '/user/signin',
    failureFlash: true
  }),
  function (req, res, next) {
    if (req.session.oldUrl) {
      var oldUrl = req.session.oldUrl;
      req.session.oldUrl = null;
      res.redirect(oldUrl + '');
    } else {
      res.redirect('/user/profile');
    }
  }
);

module.exports = router;

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/');
}

function notLoggedIn(req, res, next) {
  if (!req.isAuthenticated()) {
    return next();
  }
  res.redirect('/');
}

