var express = require('express');
var cool = require('cool-ascii-faces');
var mongo = require('mongodb');
var mongoose = require('mongoose');
var privateData = require('./dbConfig.js');



var bodyParser = require('body-parser');
var session = require('express-session');
var app = express();

app.use(bodyParser.urlencoded({
	extended: true
}));

app.use(bodyParser.json());

mongoose.connect(privateData.mongo_uri);
 
app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');


require('./routes/index.js')(app);

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


