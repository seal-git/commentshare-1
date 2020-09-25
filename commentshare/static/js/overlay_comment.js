
$(window).on('load',function(){
	console.log("overlay")
})

//仮のコメントリスト
var tmpCommentList2 = [
{"name": "user1", "time": "1111", "value": "コメント1", "span-page":1, "span-left": 99.126, "span-top": 110.38, "offset": -200},
{"name": "user2", "time": "2222", "value": "コメント2", "span-page":1, "span-left": 251, "span-top": 623, "offset": -100},
{"name": "user3", "time": "3333", "value": "コメント3", "span-page":1, "span-left": 251, "span-top": 623, "offset": 50}
];

// var commentList = tmpCommentList2;

//コメントリストをサーバーから読み込む
var commentList;
var str_commentList;
const xhr = new XMLHttpRequest();
xhr.open("POST", "/get_comment");
xhr.setRequestHeader("Content-Type", "application/json");
xhr.onload = function(){
	console.log(xhr.status);
	console.log(xhr.readyState);
	if(xhr.readyState!=4){
		//リクエスト中
	}else if(xhr.status!=200){
		//失敗
	}else{
		//コメントリストを受け取って配列に入れる
		str_commentList = xhr.responseText;
		console.log("xrt",xhr.responseText)
		commentList = JSON.parse(str_commentList);
		//commentList.pop();	//emptyである最後の1行も文字列に加えられてしまうので末尾を削除
		//for(var i=0; i<commentList.length; i++){
			// console.log(commentList[i]);
			//commentList[i] = JSON.parse(commentList[i]);
		//}
		console.log("cl",commentList);
	}};
param = '{"pdf_id":'+pdf_id+'}'
console.log(param)
xhr.send(param);

const viewer = document.getElementById("viewer");
viewer.onmousemove =function(e){	//viwer要素上でmousemoveしたら発火
	popover(viewer, commentList);
}

