/**
 *
 */
var makeComment = function(commentTarget){
	var commentList = [];


	for(var i=0; i<commentTarget.length; i++){
	var commentBlock = '<div class="comment-block">';
	commentBlock = '<div class="comment-info balloon">';
	commentBlock += '<div class="comment-username balloon">'+commentTarget[i]["id"]+'</div>';
	commentBlock += '<div class="comment-time balloon">'+commentTarget[i]["time"]+'</div>';
	commentBlock += '</div>';
	commentBlock += '<div class="comment-value balloon">'+commentTarget[i]["value"]+'</div>';
	commentBlock += '</div>';

	commentList.push(commentBlock);
	}
	var comment =  '<div class="balloon">';
	for (var i=0; i<commentList.length; i++){
		comment += commentList[i];
	}
	comment += '<form id="comment-reply" method="" action="">';
	comment += '<input type="text">';
	comment += '<input type="submit">';
	comment += '</div>';
	console.log(comment);
	return comment;
}
$('#comment-reply').submit(function(e){
	var data = [
		{"name" : "test_user"},
		{"comment" : e.target.value},
		{"time" : Date.now()}
	]
	var json_data = JSON.stringify(data);
	const xhr = new XMLHttpRequest();
	xhr.open("POST", "/add_comment");
	xhr.setRequestHeader("Content-Type", "application/json")
	xhr.send(json_data);
})
