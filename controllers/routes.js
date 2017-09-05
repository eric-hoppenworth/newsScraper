var routes = require("express").Router();
// Require request and cheerio. This makes the scraping possible
var request = require("request");
var cheerio = require("cheerio");

routes.get("/retrieve",function(req,res){
	routes.scrapeMe().then(function(data){
		res.json(data);
	});
});

routes.get("/store",function(req,res){
	routes.scrapeMe().then(function(data){
		db.scrapedData.insert(data);
		res.send("stored!")
	});
});

routes.scrapeMe = function(){
	console.log("function is running");
	var myUrl = "http://money.cnn.com";
	// Make a request call to grab the HTML body from the site of your choice
	return new Promise(function(resolve,reject){
		request(myUrl, function(error, response, html) {
			console.log("url pinged");
		  // Load the HTML into cheerio and save it to a variable
		  // '$' becomes a shorthand for cheerio's selector commands, much like jQuery's '$'
		  var $ = cheerio.load(html);

		  // An empty array to save the data that we'll scrape
		  var results = [];

		  // Select each element in the HTML body from which you want information.
		  // NOTE: Cheerio selectors function similarly to jQuery's selectors,
		  // but be sure to visit the package's npm page to see how it works
		  $("a.homepage-stack-hed").each(function(i, element) {

		    var link = myUrl + $(element).attr("href");
		    var title = $(element).children().text();

		    // Save these results in an object that we'll push into the results array we defined earlier
		    results.push({
		      title: title,
		      link: link
		    });
		  });
		  resolve(results);
		});
	});
};

module.exports = routes;