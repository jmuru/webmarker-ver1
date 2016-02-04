var express = require('express');
var cool = require('cool-ascii-faces');
var mongo - require('mongodb');
var mongoose = require('mongoose');
var privateData = require('./config.js')
var app = express();

// mongoose.connect(privateData.mongo_uri);

console.log('hello');
app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  response.render('pages/index');
});

app.get('/cool', function(request, response) {
  response.send(cool());
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


