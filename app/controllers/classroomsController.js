var express = require('express');
var app = express.Router();
var Room = require('../models/room');
var middleware = require('../helpers/middleware');


// show all classrooms belonging to logged in user
app.get('/classrooms', middleware.isLoggedIn, function(req, res) {
	var room = [];
	Room.find({ 'username': req.user.username }, function(err, found_rooms) {
		if (found_rooms) {
			room = found_rooms;
		}
		res.render('classrooms.ejs', {
		    user : req.user, // get the user out of session and pass to template
		    rooms : room
		});
	});
});

// creating a new class
app.post('/classrooms', middleware.isLoggedInJson, function(req, res) {
	var newRoom = new Room();
	newRoom.username = req.user.username;
	newRoom.name = req.body.name;
	newRoom.desc = req.body.desc;
	newRoom.save(function(err) {
	  if (err) {
	    throw err;
	  }
	  res.json(newRoom);
	});
});

// This is when a user join a classroom by entering the classroom id directly (with a link)
// e.g http://localhost:3000/classroom/fs66ix5c
app.get('/classrooms/:room_id', function(req, res) {
	Room.findOne({ '_id': req.params.room_id }, function(err, found) {
	  if (err) {
	    // should flash a message stating room not found
	    res.redirect('/classrooms');
	    return;
	  }
	  if (found) {
	    // if user is authenticated in the session, carry on
	    if (req.isAuthenticated()) { // room owner
	      res.render(req.user.username === found.username ? 'room_caster.ejs' : 'room_viewer.ejs', {
	        user : req.user,
	        room : found
	      });
	    } else { // definitely viewer
	      // todo, implement live view and replay view
	      // replay will be record and play
	      res.render('room_viewer.ejs', {
	        room : found
	      });
	    }
	  } else {
	    // should flash a message stating room not found
	    res.redirect('/classrooms');
	  }
	});
});

module.exports = app;