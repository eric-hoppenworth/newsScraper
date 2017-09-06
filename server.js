// mongodb://heroku_2h7qt7dd:di3rv1j843isogfots359u6iff@ds111204.mlab.com:11204/heroku_2h7qt7dd
// mongodb URI

// Dependencies
var express = require("express");
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

var exphbs = require("express-handlebars");
var path = require("path");

// Initialize Express
var app = express();
const bodyParser = require("body-parser");
//including bodyParser
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;

//connect router
var routes = require("./controllers/routes.js")(app,mongoose);

//use handlebars
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");


//make static folder
app.use('/assets', express.static(path.join(__dirname, 'public/assets')));

// Hook mongoose configuration to the db variable
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  	console.log("mogoose running");
  	app.listen(3000, function() {
	  console.log("App running on port 3000!");
	});
});



