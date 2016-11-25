var express = require('express');
var router  = express.Router();
var path    = require('path');
var User    = require('./models/user');
var ai      = require('./ai');

// middleware to use for all requests
router.use(function(req, res, next) {
  // check if client sent cookie
  var cookieName = req.cookies.cookieName;

  if (cookieName === undefined) {
    // no: set a new cookie
    var randomNumber=Math.random().toString();
    randomNumber=randomNumber.substring(2,randomNumber.length);
    res.cookie('cookieName',randomNumber, { maxAge: 90000000000, httpOnly: true });
    console.log('cookie created');
  } else {
    console.log(cookieName);
  }

  //create user object in case it doesn't exist
  var user = {};
  user.cookie = cookieName;
  user.history = [];
  user.wins = 0;
  user.losses = 0;
  user.ties = 0;
  user.games = 0;

  var query = {cookie: user.cookie},
      update = {cookie: user.cookie},
      options = {upsert: true, new: true, setOnInsert: user};

  User.findOneAndUpdate(query, update, options, function(err, usr) {
      if (err)
        console.log(err);

      req.prediction = ai.predict(usr.history);
      next();
  });
});

router.get('/', function(req, res) {
  User.findOne({'cookie': req.cookies.cookieName}, function(err, user) {
    if (err)
      res.send(err);
      
    res.render('home', {user: user, result: ' '}); 
  }); 
});

router.get('/rock', function(req, res) {
  User.findOne({'cookie': req.cookies.cookieName}, function(err, user) {
    if (err)
      res.send(err);

    var result = ai.pickWinner(req.prediction, 'rock');
    switch(result) {
      case 'win':
          user.wins ++;
          break;
      case 'loss':
          user.losses ++;
          break;
      case 'tie':
          user.ties ++;
          break;
    }
    user.games ++;
    user.history.push('rock');
    user.save(function(err) {
      if (err)
        res.send(err);
      
      res.render('home', {user: user, result: result}); 
    });
  }); 
});

router.get('/paper', function(req, res) {
  User.findOne({'cookie': req.cookies.cookieName}, function(err, user) {
    if (err)
      res.send(err);

    var result = ai.pickWinner(req.prediction, 'paper');
    switch(result) {
      case 'win':
          user.wins ++;
          break;
      case 'loss':
          user.losses ++;
          break;
      case 'tie':
          user.ties ++;
          break;
    }
    user.games ++;
    user.history.push('paper');
    user.save(function(err) {
      if (err)
        res.send(err);
      
      res.render('home', {user: user, result: result}); 
    });
  }); 
});

router.get('/scissors', function(req, res) {
  User.findOne({'cookie': req.cookies.cookieName}, function(err, user) {
    if (err)
      res.send(err);

    var result = ai.pickWinner(req.prediction, 'scissors');
    switch(result) {
      case 'win':
          user.wins ++;
          break;
      case 'loss':
          user.losses ++;
          break;
      case 'tie':
          user.ties ++;
          break;
    }
    user.games ++;
    user.history.push('scissors');
    user.save(function(err) {
      if (err)
        res.send(err);
      
      res.render('home', {user: user, result: result}); 
    });
  }); 
});

router.get('/test', function(req, res) {
  User.find(function(err, users) {
    if (err)
      res.json(err);

    res.json(users); 
  });
});

module.exports = router;