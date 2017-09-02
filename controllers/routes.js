

app.get("/retrieve",function(req,res){
	scrapeMe().then(function(data){
		res.json(data);
	});
});

app.get("/store",function(req,res){
	scrapeMe().then(function(data){
		db.scrapedData.insert(data);
		res.send("stored!")
	});
});

function scrapeMe(){
	var url = "http://money.cnn.com"
	// Make a request call to grab the HTML body from the site of your choice
	return new Promise(function(resolve,reject){
		request(url, function(error, response, html) {

		  // Load the HTML into cheerio and save it to a variable
		  // '$' becomes a shorthand for cheerio's selector commands, much like jQuery's '$'
		  var $ = cheerio.load(html);

		  // An empty array to save the data that we'll scrape
		  var results = [];

		  // Select each element in the HTML body from which you want information.
		  // NOTE: Cheerio selectors function similarly to jQuery's selectors,
		  // but be sure to visit the package's npm page to see how it works
		  $("a.homepage-stack-hed").each(function(i, element) {

		    var link = url + $(element).attr("href");
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
}