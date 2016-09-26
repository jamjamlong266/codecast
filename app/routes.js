//var helpers = require('./helpers');
var Room                = require('../app/models/room');
var homeCtrl            = require('../app/controllers/homeController');
var accountCtrl         = require('../app/controllers/accountController');
var classroomsCtrl      = require('../app/controllers/classroomsController');
var profileCtrl         = require('../app/controllers/profileController');
var api                 = require('../app/routes/api');

module.exports = function(app, passport) {

  app.use(homeCtrl); //homecontroller
  app.use(accountCtrl); //initiate controller for accounts
  app.use(classroomsCtrl); //initiate controller for classrooms
  app.use(profileCtrl);
  app.use('/api', api);
  
  app.get('/about', function(req, res) {
    res.render('about.ejs');
  });
  app.get('/project', function(req, res) {
    res.render('project.ejs');
  });

};