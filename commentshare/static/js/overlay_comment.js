
$(window).on('load',function(){
	console.log("overlay")
})

//仮のコメントリスト
var text_commentList = [
{"name": "user1", "time": "1111", "value": "コメント1", "span-page":2, "span-left": 219, "span-top": 711, "offset": -200},
{"name": "user2", "time": "2222", "value": "コメント2", "span-page":2, "span-left": 251, "span-top": 623, "offset": -100},
{"name": "user3", "time": "3333", "value": "コメント3", "span-page":2, "span-left": 251, "span-top": 623, "offset": 50}
];

//コメントリストをサーバーから読み込む
var str_commentList;
var commentList;
const xhr = new XMLHttpRequest();
xhr.open("POST", "/get_comment");
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
		commentList = str_commentList.split("\n");
		commentList.pop();	//emptyである最後の1行も文字列に加えられてしまうので末尾を削除
		for(var i=0; i<commentList.length; i++){
			// console.log(commentList[i]);
			commentList[i] = JSON.parse(commentList[i]);
		}
		console.log(commentList);
	}
};
xhr.send(null);

const a = document.getElementById("viewer");
a.onmousemove =function(){	//viwer要素上でmousemoveしたら発火
	var hover = $(":hover");	//カーソル上の要素を全て返す
	Object.keys(hover).forEach(function(key){	//連想配列をforEachするときの書き方(途中でbreakはできない)
		if(hover[key].tagName == "SPAN"){
			hover[key].onmousemove = function(){
				//要素のcssスタイル、ページ番号を取得
				var style = window.getComputedStyle(hover[key]);
				var top = style.getPropertyValue("top").slice(0, -2);
				top = parseInt(top, 10);
				var left = style.getPropertyValue("left").slice(0,-2);
				left = parseInt(left, 10);
				var page = hover[key].parentNode.parentNode.dataset.pageNumber;
				console.log(hover[key].textContent);
				console.log("left", left, "top", top, "page", page);

				//カーソルの指すspanについているコメントのリストを返す
				var target = commentList.filter(function(comment){
					return(comment["span-left"] === left)
				});
				target = target.filter(function(comment){
					return(comment["span-top"] === top)
				});

				//カーソルの指すspanにコメントがついていれば表示する
				if(target.length){
					var commentTarget = target;
					//要素の背景色の変更
					hover[key].style.backgroundColor = "red";

					//吹き出しを表示(jquery.balloon.jsから)
					$(hover[key]).balloon({
						position: "right",
						// offsetX : commentTarget["offset"],
						showDuration: 10,
						tipSize: 20,
						css: {
							"minWidth": "200px",
							"color": "#0000ff",
							"font-size": "20px",
							"font-weight": "bold",
							"border": "solid 2px #111",
							"padding": "0px",
							"background-color": "#eee",
							"opacity": 1,
						},
						"html":true,
						contents: makeComment(commentTarget)
					});
				}
			}
			hover[key].onmouseleave = function(){
					hover[key].style.backgroundColor = "white"
			}
		}
	});
}
function OnButtonClick(e){
	console.log("e", e.target.parentElement.parentElement.dataset.page)
	var page = Number(e.target.parentElement.parentElement.dataset.page);
	var top = Number(e.target.parentElement.parentElement.dataset.top);
	var left = Number(e.target.parentElement.parentElement.dataset.left);
	console.log({"page":page, "left":left, "top":top})
	console.log(document.getElementById("reply-input").value)
	var data = {
		"name" : "test_user",
		"time" : Date.now(),
		"value" : document.getElementById("reply-input").value,
		"span-page" : page,
		"span-left" : left,
		"span-top" : top
	}
	console.log(data);
	Promise.resolve()
	.then(function(){
		return new Promise(function(resolve, reject){
			setTimeout(function(){
				console.log("sending");
				var json_data = JSON.stringify(data);
				const xhr = new XMLHttpRequest();
				xhr.open("POST", "/add_comment");
				xhr.setRequestHeader("Content-Type", "application/json")
				xhr.send(json_data);
				document.getElementById("reply-input").value = "";
				resolve();
			}, 350);
		});
	})
	.then(function(){
		return new Promise(function(resolve, reject){
			setTimeout(function(){
				window.location.reload();
				resolve();
			}, 300)
		});
	})

};

