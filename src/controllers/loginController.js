const session = require('express-session');
const Login = require('../models/LoginModel')

exports.index = (req, res) => {
    console.log(req.session.user);
    if(req.session.user) return res.render('index');
    res.render('login');
};

exports.register = async (req, res) => {

    // Only have to use try/catch at this level, where it's going to be agrouped
    // all the errors from the model and the middleware
    try {
        const login = new Login(req.body);
        await login.register();

        if(login.errors.length > 0) {
            req.flash('errors', login.errors);
            req.session.save(function() {
                return res.redirect('/login/index');
            });
            return;
        }

        req.flash('success', 'Your user has been created successfully.');
        req.session.save(function() {
            return res.redirect('/login/index');
        });
    } catch(e) {
        console.log(e);
        return res.render('404');
    }
};

exports.login = async (req, res) => {

    // Only have to use try/catch at this level, where it's going to be agrouped
    // all the errors from the model and the middleware
    try {
        const login = new Login(req.body);
        await login.login();

        if(login.errors.length > 0) {
            req.flash('errors', login.errors);
            req.session.save(function() {
                return res.redirect('/login/index');
            });
            return;
        }

        req.flash('success', 'You are logged in');
        req.session.user = login.user;
        req.session.save(function() {
            return res.redirect('/login/index');
        });
    } catch(e) {
        console.log(e);
        return res.render('404');
    }
};

exports.logout = function(req, res) {
    req.session.destroy();
    res.redirect('/');
}
