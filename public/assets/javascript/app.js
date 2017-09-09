// Horizontal scroll for top bar
$('#crawlerContainer').mousewheel(function(e, delta) {
    this.scrollLeft -= (delta * 40);
    e.preventDefault();
});
// initailize tooltips
$(function () {
  $('[data-toggle="tooltip"]').tooltip()
});
// onclick functions for selecting stories
$(".articleThumb").on("click",function(event){
	//change the url in the iframe
	$("#storyHolder iframe").attr("src",$(this).attr("data-link"));
	//change the data-id on the comment submit button
	var id = $(this).attr("data-id");
	$("#newComment").attr("data-id",id);
	//empty comments
	$("#cardHolder").empty();
	//fetch comments for this article
	$.get("/findOne/" + id, function(response,err){
		var comments = response.comments;
		$("#cardHolder").prepend("<div class = 'card'></div>");
		for (var i = 0; i < comments.length; i++){
			var htmlString = "<div class = 'card'><div class = 'card-body'>";
			htmlString += "<h4 class='card-title'>";
			htmlString += comments[i].author;
			htmlString +='</h4><p class="card-text">';
			htmlString += comments[i].content;
			htmlString += '</p></div></div>';

			$("#cardHolder").prepend(htmlString);
		}
	});
});
//on click for submitting a new comment
//(newComment comes in with author, content, and article(id) )
$("#newComment").on("click",function(event){
	event.preventDefault();
	var newComment = {};
	newComment.author = $("#commentAuthor").val().trim();
	newComment.content = $("#commentContent").val().trim();
	newComment.article = $(this).attr("data-id");
	$.post("/comment",newComment,function(response){
		console.log("posted");
		var htmlString = "<div class = 'card'><div class = 'card-body'>";
		htmlString += "<h4 class='card-title'>";
		htmlString += newComment.author;
		htmlString +='</h4><p class="card-text">';
		htmlString += newComment.content;
		htmlString += '</p></div></div>';

		$("#cardHolder").prepend(htmlString);
	});
	$("#commentAuthor").val("");
	$("#commentContent").val("");
});

//ask the server to store any new articles
$.get("/store",function(data){
	console.log(data);
});