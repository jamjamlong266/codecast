var express = require('express');
var app = express.Router();
var middleware = require('../helpers/middleware');

// home page
app.get('/', function(req, res) {
	res.render('index.ejs'); // load the index.ejs file
});

module.exports = app;