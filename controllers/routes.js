// Require request and cheerio. This makes the scraping possible
var request = require("request");
var cheerio = require("cheerio");
//connect models


module.exports = function(routes,mongoose){
	var models = require("../models/models.js")(mongoose);
	const Article = models.Article;
	const Comment = models.Comment;

	routes.get("/",function(req,res){
		Article.find().populate('comments').exec(function(err,data){
			if (err){
				return console.error(err);
			}
			res.render("index",{data:data});
		});
		
	});

	//scrapes articles and stores them in the database
	routes.get("/store",function(req,res){
		scrapeMe().then(function(data){
			for (var i =0 ; i< data.length; i++){
				let myArticle = new Article(data[i]);
				//only add the new item if it doesn't exist.
				//we check by headline;
				Article.findOneAndUpdate(
					{headline: myArticle.headline},
					{
						headline: myArticle.headline,
						link: myArticle.link,
						summary: myArticle.summary,
						imgUrl: myArticle.imgUrl
					},
					{upsert: true,new:true},
					function(err,data){
						if (err){
							return console.error(err);
						} else {

						}
					}
				);
			}
			res.send("stored!");
		});
	});

	//gets all articles from the database.
	routes.get("/read",function(req,res){
		Article.find().populate('comments').exec(function(err,data){
			if (err){
				return console.error(err);
			}
			res.json(data);
		});
	});

	//add a comment
	//(newComment comes in with author, content, and article(id) )
	routes.post("/comment",function(req,res){
		var newComment = new Comment(req.body);
		newComment.save(function(err,result){
			if(err){
				return console.error(err);
			}
			Article.findOneAndUpdate(
				{_id: newComment.article},
				{$push: {comments: result._id}},
				function(err,result){
					if(err){
						return console.error(err);
					}
					res.send(result);
				}
			);
		});
	});

	scrapeMe = function(){
		var myUrl = "https://reason.com/";
		return new Promise(function(resolve,reject){
			request(myUrl,function(error,response,htmlPage){
				var $ = cheerio.load(htmlPage);

				var results = [];
				$("li.post").each(function(i,element){
					var myA = $(element).children("a").eq(0);
					if(i < 20){
						let link = "https:" + myA.attr("href");
						results.push({
							headline: $(element).children("h3").text(),
							link: link,
							summary: $(element).children("h4").text(),
							imgUrl: $(element).find("img").attr("src")
						});
					}
				});
				resolve(results);
			});
		});
	};

}
