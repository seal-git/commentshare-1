//吹き出しを表示する関数
var popover = function(viewer, commentList){
	var hover = $(":hover");	//カーソル上の要素を全て返す
	console.log(hover)
	var tags = (Object.values(hover)).map(p => p.tagName)
	var IndexOfSpan = tags.indexOf("SPAN")
	// console.log(tags)
	console.log(IndexOfSpan)

	if(IndexOfSpan>0){	//カーソルがspanを指していたら
		hover[IndexOfSpan].onmousemove = function(){
			//要素の(left,top)をviewerサイズ(1000,1000)で正規化した値を取得
			pageStyle = window.getComputedStyle(hover[IndexOfSpan].parentNode.parentNode)
			var pageWidth = parseFloat(pageStyle.getPropertyValue("width"));
			var pageHeight = parseFloat(pageStyle.getPropertyValue("height"));
			var style = window.getComputedStyle(hover[IndexOfSpan]);
			var top = style.getPropertyValue("top").slice(0, -2);
			top = parseFloat(top, 10)/pageHeight*1000.0;
			var left = style.getPropertyValue("left").slice(0,-2);
			left = parseFloat(left, 10)/pageWidth*1000.0;
			//要素のページ番号を取得
			var page = hover[IndexOfSpan].parentNode.parentNode.dataset.pageNumber;
			console.log(hover[IndexOfSpan].textContent);
			console.log("left", left, "top", top, "page", page);

			//カーソルの指すspanについているコメントのリストを返す
			var target = commentList.filter(function(comment){
				return(Math.abs(comment["span-left"]-left)<1.0)
			});
			target = target.filter(function(comment){
				return(Math.abs(comment["span-top"]-top)<1.0)
			});

			//カーソルの指すspanにコメントがついていれば表示する
			if(target.length){
				var commentTarget = target;
				//要素の背景色の変更
				hover[IndexOfSpan].style.backgroundColor = "red";

				//吹き出しを表示(jquery.balloon.jsから)
				$(hover[IndexOfSpan]).balloon({
					// position: "right",
					position: "bottom",
					// offsetX : -100,
					offsetY : -5,
					minLifetime : 500,
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
			}else{
				highlight(viewer, commentList);
			}
		}
		hover[IndexOfSpan].onmouseleave = function(){
				hover[IndexOfSpan].style.backgroundColor = "white"
		}
		console.log("popover")
	}else{
		console.log("else")
		highlight(viewer, commentList);
	}
}

//吹き出し内の送信ボタンが押されたら発火
function OnButtonClick(e){
	var value = document.getElementById("reply-input").value
	console.log(document.getElementById("reply-input"));
	if(value.length == 0){
		alert("コメントが入力されていません");
		return(-1);
	}else{
		//コメントデータ形成
		var page = Number(e.target.parentElement.parentElement.dataset.page);
		var top = Number(e.target.parentElement.parentElement.dataset.top);
		var left = Number(e.target.parentElement.parentElement.dataset.left);
		var value_url = toURL(document.getElementById("reply-input").value);
		console.log({"page":page, "left":left, "top":top})
		console.log(document.getElementById("reply-input").value)
		var data = {
			"name" : "test_user",
			"time" : Date.now(),
			"value" : value_url,
			"span-page" : page,
			"span-left" : left,
			"span-top" : top
		}
		console.log(data);

		//コメントデータ送信
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
					// document.getElementById("reply-input").value = "";
					resolve();
				}, 400);
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
	}
};
