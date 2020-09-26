var toDate = function(time){
	//日付を表示する関数
	var date = new Date(time);
	var y = date.getFullYear();
	var m = ("0"+(date.getMonth()+1)).slice(-2);
	var d = ("0"+date.getDate()).slice(-2);
	var ho = ("0"+date.getHours()).slice(-2);
	var mi = ("0"+date.getMinutes()).slice(-2);
	// var se = ("0"+date.getSeconds()).slice(-2);
	var result = y+"/"+m+"/"+d+" "+ho+":"+mi;
	console.log(time)
	return result;
}

//吹き出しの中身のhtmlを返す関数
var makeComment = function(commentTarget){
	//コメントブロックを人数分の配列に入れる
	var commentList = [];

	//一人分のコメントのブロックを書き出す
	for(var i=0; i<commentTarget.length; i++){
		var commentBlock = '<div class="comment-block" style="padding-bottom:15px">';
		commentBlock += '<div class="comment-info balloon">';
		//アイコン・アカウント
		commentBlock += '<div class="comment-user balloon"><a href="home"><img src="../static/images/icon.png" class="icon"></a>'+commentTarget[i]["name"]+'</div>';
		//日付
		commentBlock += '<div class="comment-time balloon">'+toDate(commentTarget[i]["time"])+'</div>';
		commentBlock += '</div>';
		//コメント
		commentBlock += '<div class="comment-value balloon">'+commentTarget[i]["value"]+'</div>';
		//いいねボタン
		commentBlock += '<div class="comment-favorite balloon"><input type="image" src="../static/images/good_button.jpg" class="good_button" onclick="FavoriteClick(event)">'+'1'+'</div>';
		commentBlock += '</div>';

		commentList.push(commentBlock);
	}

	//コメントブロックとその他の情報をまとめてcommentのhtmlを生成する
	//コメントの位置情報を記憶
	var comment =  '<div class="balloon"'
	comment +=  ' data-page='+commentTarget[0]["span-page"];
	comment +=  ' data-left='+commentTarget[0]["span-left"];
	comment +=  ' data-top='+commentTarget[0]["span-top"]+'>';

	//コメントブロックをまとめて吹き出し内に書き出す
	for (var i=0; i<commentList.length; i++){
		comment += commentList[i];
	}
	//その下に返信フォームもつける
	comment += '<form id="reply-form" method="" action="" style="padding-bottom:15px">';
	comment += '<input type="text" class="reply-input">';
	comment += '<input type="button" class="reply-submit" value="送信" onclick="OnButtonClick(event);"> ';
	comment += '</div>';
	console.log(comment);


	return comment;
}
