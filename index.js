var express = require('express');
var app = express();


var mongoose = require('mongoose');
var User = require('./api/models/userModel'); 


// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/checkers1'); 
app.use(express.json());
var routes = require('./api/routes/routes.js'); //importing route
routes(app); //register the route

app.use(express.static('webapp'));

app.listen(3000);