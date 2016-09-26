var express = require('express');
var app = express.Router();
var middleware = require('../helpers/middleware');

app.get('/profile', function(req, res) {
	res.render('profile.ejs'); // load the index.ejs file
});

// we will want this protected so you have to be logged in to visit
// we will use route middleware to verify this (the isLoggedIn function)
app.get('/profile', middleware.isLoggedIn, function(req, res) {
	res.render('profile.ejs', {
	  user : req.user // get the user out of session and pass to template
	});
});


module.exports = app;