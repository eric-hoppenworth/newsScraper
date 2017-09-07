module.exports = function(mongoose){
	var Schema = mongoose.Schema;
	var articleSchema = mongoose.Schema({
		_id: Schema.Types.ObjectId,
		headline: String,
		link: String,
		summary: String,
		imgUrl: String,
		bigImg: String,
		comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }]
	});

	var commentSchema = mongoose.Schema({
		author: String,
		content: String,
		article: {type: Schema.Types.ObjectId, ref: "Article"}
	},{timestamps:true})

	var Article = mongoose.model("Article", articleSchema);
	var Comment = mongoose.model("Comment",commentSchema);


	return {
		Article: Article,
		Comment: Comment
	}

};

