var express = require('express');
var app = express();


var mongoose = require('mongoose');
var ArenaSocket = require('./api/routes/sockets');


// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/checkers1'); 
app.use(express.json());
var routes = require('./api/routes/routes.js'); //importing route
routes(app); //register the route
var arenaSocket = new ArenaSocket();
app.use(express.static('webapp'));

app.listen(3000);