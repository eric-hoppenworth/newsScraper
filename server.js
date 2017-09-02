// mongodb://heroku_2h7qt7dd:di3rv1j843isogfots359u6iff@ds111204.mlab.com:11204/heroku_2h7qt7dd
// mongodb URI

// Dependencies
var express = require("express");
var mongojs = require("mongojs");
// Require request and cheerio. This makes the scraping possible
var request = require("request");
var cheerio = require("cheerio");
var path = require("path");

// Initialize Express
var app = express();
const bodyParser = require("body-parser");
//including bodyParser
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;

var routes = require("./controllers/burgers_controller.js");

//use handlebars
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
//connect router
app.use("/",routes);

//make static folder
app.use('/assets', express.static(path.join(__dirname, 'public/assets')));

var databaseUrl = "scraper";
var collections = ["scrapedData"];

// Hook mongojs configuration to the db variable
var db = mongojs(databaseUrl, collections);
db.on("error", function(error) {
  console.log("Database Error:", error);
});


app.listen(3000, function() {
  console.log("App running on port 3000!");
});

