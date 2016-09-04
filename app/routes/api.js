var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Room = require('../models/room');


// api that lists all classrooms, (public and private not implemented yet)
// it will show all for now
router.get('/classrooms', function(req, res) {
	Room.find({}, function(err, found_rooms) {
		if (err) {
			res.status(500);
			res.json({ 'error' : 'Error loading classrooms' });
		} else {
			res.json(found_rooms);
		}
	});
});



module.exports = router;