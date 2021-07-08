//仮のコメントリスト
var tmpCommentList = [
{"name": "user1", "time": "1111", "value": "コメント1", "span-page":1, "span-left": 99.126, "span-top": 110.38, "offset": -200},
{"name": "user2", "time": "2222", "value": "コメント2", "span-page":1, "span-left": 251, "span-top": 623, "offset": -100},
{"name": "user3", "time": "3333", "value": "コメント3", "span-page":1, "span-left": 251, "span-top": 623, "offset": 50}
];

function get_responce(pdf_id){
	//コメントリストをサーバーから読み込む関数
	var deferred = new $.Deferred;
	$.ajax({
		type: "post",
		url: "/get_comment",
		data: JSON.stringify({"pdf_id": pdf_id}),
		contentType: "application/json",
		dataType: "text" //dataTypeをtextに指定しないとparserrorが返る
	})
	.done(
		function(responce){
			console.log("success");
			console.log("responce",responce)
			deferred.resolve(responce);
	}).fail(
		function(XMLHttpRequest, textStatus, errorThrown){
			alert("コメントの取得に失敗しました");
			console.log(XMLHttpRequest.status);
			console.log(textStatus);
			console.log(errorThrown.message);
			deferred.reject();
	});
	return deferred.promise();
}

function reload_comment(commentList){
	//commentListを受け取ってコメントをリロードする関数
	const viewer = document.getElementById("viewer");
	viewer.onmousemove =function(e){	//viwer要素上でmousemoveしたら発火
		popover(viewer, commentList);
	}
}

function get_comment(pdf_id){
	//コメントの更新をする関数
	get_responce(
		pdf_id
	).done(function(responce){
		//pdf_idのコメントを受け取ってmapにする
		commentList = JSON.parse(responce);
	}).then(function(){
		//コメントをリロードする
		reload_comment(commentList);
		console.log("comment rl", commentList);
	});
}
var commentList = get_comment(pdf_id);


//コメントリストをサーバーから読み込む
//const xhr = new XMLHttpRequest();
//xhr.open("POST", "/get_comment");
//xhr.setRequestHeader("Content-Type", "application/json");
//xhr.onload = function(){
//	console.log(xhr.status);
//	console.log(xhr.readyState);
//	if(xhr.readyState!=4){
//		//リクエスト中
//	}else if(xhr.status!=200){
//		//失敗
//	}else{
//		//コメントリストを受け取って配列に入れる
//		str_commentList = xhr.responseText;
//		console.log("xrt",xhr.responseText)
//		commentList = JSON.parse(str_commentList);
//		//commentList.pop();	//emptyである最後の1行も文字列に加えられてしまうので末尾を削除
//		//for(var i=0; i<commentList.length; i++){
//			// console.log(commentList[i]);
//			//commentList[i] = JSON.parse(commentList[i]);
//		//}
//		console.log("cl",commentList);
//	}};
//param = '{"pdf_id":'+pdf_id+'}'
//console.log(param)
//xhr.send(param);


