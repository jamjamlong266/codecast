// var middleware = {
	// route middleware to check if user is logged in, JSON
	module.exports.isLoggedIn = function(req, res, next) {
	  // if user is authenticated in the session, carry on
	  if (req.isAuthenticated()) {
	  	return next();
	  }

	  // if they aren't redirect them to the home page
	  req.flash('loginMessage', 'Please login to proceed.');
	  res.redirect('/login');
	};
	// route middleware to check if user is logged in, JSON
	module.exports.isLoggedInJson = function(req, res, next) {
	  // if user is authenticated in the session, carry on
	  if (req.isAuthenticated()) {
	  	return next();
	  }
	  res.status(403); // forbidden, or should it be 401?
	  res.json({ 'error': 'You are not logged in yet.' });
	};
	// route middleware to check if user is NOT logged in
	module.exports.notLoggedIn = function(req, res, next) {
	  // if user is not authenticated, then carry on
	  if (!req.isAuthenticated()) {
	  	return next();
	  }
	  res.redirect('/profile');
	};
// }

// module.exports = middleware;