var express = require('express');
var app = express.Router();
var passport = require('passport');
var middleware = require('../helpers/middleware');


// login form
app.get('/login', middleware.notLoggedIn, function(req, res) {
	// render the page and pass in any flash data if it exists
	res.render('login.ejs', { message: req.flash('loginMessage') });
});

// process the login form
app.post('/login', passport.authenticate('local-login', {
	successRedirect : '/classrooms', // redirect to the secure profile section
	failureRedirect : '/login', // redirect back to the signup page if there is an error
	failureFlash : true // allow flash messages
}));

// call this route to destroy session
app.get('/logout', function(req, res) {
	req.logout();
	res.redirect('/');
});

// signup form
app.get('/signup', middleware.notLoggedIn, function(req, res) {
    // render the page and pass in any flash data if it exists
    res.render('signup.ejs', { message: req.flash('signupMessage') });
});

// process the signup form
app.post('/signup', passport.authenticate('local-signup', {
	successRedirect : '/classrooms', // redirect to the secure profile section
	failureRedirect : '/signup', // redirect back to the signup page if there is an error
	failureFlash : true // allow flash messages
}));

module.exports = app;