const express = require('express')
const router = express.Router({ mergeParams: true })
const catchAsync = require('../utils/catchAsync')
const users = require('../controllers/users')
const passport = require('passport')

router.route('/register')
    .get(users.renderRegisterForm)

    .post(catchAsync(users.registerUser))

router.route('/login')
    .get(users.renderLoginForm)

    .post(passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), users.loginUser)

router.get('/logout', users.logoutUser)

module.exports = router