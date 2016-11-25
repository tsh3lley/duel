var express 		= require('express');
var bodyParser 		= require('body-parser');
var cookieParser 	= require('cookie-parser');
var validator  		= require('express-validator');
var mongoose   		= require('mongoose');
var pug        		= require('pug');
var router     		= require('./app/routes');
var app        		= express();

mongoose.connect('mongodb://127.0.0.1:27017/ljfeenvevaavmf'); // con to mongo

// bodyparser used for POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// validator
app.use(validator());

// cookies
app.use(cookieParser());

// views
app.set('views', './views')
app.set('view engine', 'pug');

var port = process.env.PORT || 8080;

// register route with router
app.use('/', router);

// start the server
app.listen(port);
console.log('Magic happens on port ' + port);