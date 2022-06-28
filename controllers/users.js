const User = require('../models/user')

module.exports.registerUser = async (req, res, next) => {
    try {
        const { email, username, password } = req.body
        const user = new User({ email, username })
        const registeredUser = await User.register(user, password)
        req.login(registeredUser, (() => {
            req.flash('success', 'Welcome to YelpCamp!')
            res.redirect('/campgrounds')
        }))

    } catch (e) {
        req.flash('error', e.message)
        res.redirect('register')
    }
}

module.exports.renderRegisterForm = (req, res) => {
    res.render('users/register')
}

module.exports.renderLoginForm = (req, res) => {
    res.render('users/login')
}

module.exports.loginUser = (req, res) => {
    req.flash('success', 'Welcome back')
    const redirctUrl = req.session.returnTo || '/campgrounds'
    delete req.session.returnTo
    res.redirect(redirctUrl)
}

module.exports.logoutUser = (req, res,) => {
    req.logout(() => {
        req.flash('success', 'Logged out')
        res.redirect('/campgrounds')
    })
}