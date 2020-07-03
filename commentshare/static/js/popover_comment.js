//吹き出しの中身のhtmlを返す
var makeComment = function(commentTarget){
	//コメントブロックを人数分の配列に入れる
	var commentList = [];

	//一人分のコメントのブロックを書き出す
	for(var i=0; i<commentTarget.length; i++){
	var commentBlock = '<div class="comment-block">';
	commentBlock += '<div class="comment-info balloon">';
	commentBlock += '<div class="comment-username balloon">'+commentTarget[i]["name"]+'</div>';
	commentBlock += '<div class="comment-time balloon">'+commentTarget[i]["time"]+'</div>';
	commentBlock += '</div>';
	commentBlock += '<div class="comment-value balloon">'+commentTarget[i]["value"]+'</div>';
	commentBlock += '</div>';

	commentList.push(commentBlock);
	}

	var comment =  '<div class="balloon"'
	comment +=  ' data-page='+commentTarget[0]["span-page"];
	comment +=  ' data-left='+commentTarget[0]["span-left"];
	comment +=  ' data-top='+commentTarget[0]["span-top"]+'>';

	//コメントブロックをまとめて吹き出し内に書き出す
	for (var i=0; i<commentList.length; i++){
		comment += commentList[i];
	}
	//その下に返信フォームもつける
	comment += '<form id="reply-form" method="" action="">';
	comment += '<input type="text" id="reply-input">';
	// comment += '<input type="button" id="reply-submit" value="送信"> ';
	comment += '<input type="button" id="reply-submit" value="送信" onclick="OnButtonClick(event);"> ';
	comment += '</div>';
	console.log(comment);


	return comment;
}
