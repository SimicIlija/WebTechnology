var express = require('express');
var app = express();

app.use(express.static('webapp'));

app.get('/api', function(req, res){
   res.send("Hello world!");
});

app.listen(3000);