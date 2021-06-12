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
			target = target.filter(function(comment){
				return(comment["span-page"]==page)
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
					delay: 100, //表示するのに必要な秒数(0だとmousemoveで即時表示)
					showDuration: 10,
					tipSize: 20,
					css: {
						"minWidth": "200px",
						"color": "#0000ff",
						"font-size": "20px",
						"font-weight": "bold",
						"border": "solid 2px #111",
						"padding": "10px",
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
//		hover[IndexOfSpan].onmouseleave = function(){
//				hover[IndexOfSpan].style.backgroundColor = "white"
//		}
		console.log("popover")
	}else{
		console.log("else")
		highlight(viewer, commentList);
	}
}

//吹き出し内の送信ボタンが押されたら発火
function OnButtonClick(e){
	console.log(e);
	var inputs = document.getElementsByClassName("reply-input")
	console.log(inputs);
	var value;
	for (i=0; i<inputs.length; i++){
		console.log(i,":",inputs.item(i).value);
		if(inputs.item(i).value != ""){
			value = inputs.item(i).value;
		}
	}
	console.log(value);
	if(value.length == 0){
		alert("コメントが入力されていません");
		return(-1);
	}else{
		//コメントデータ形成
		var now = new Date();
		var value_url = toURL(value);
		var page = Number(e.target.parentElement.parentElement.dataset.page);
		var top = Number(e.target.parentElement.parentElement.dataset.top);
		var left = Number(e.target.parentElement.parentElement.dataset.left);
		console.log({"page":page, "left":left, "top":top})
		console.log(value)
		var data = {
			"name" : "test_user",
			"time" : now.toISOString(),
			"value" : value_url,
			"pdf_id" : pdf_id,
			"span-page" : page,
			"span-left" : left,
			"span-top" : top
		}
		console.log(data);
		var str_data = JSON.stringify(data);
		//コメントの送信
		$.ajax({
			type: "post",
			url: "/add_comment",
			data: str_data,
			contentType: "application/json",
			dataType: "text" //dataTypeをtextに指定しないとparserrorが返る
		})
		.then( //then()は成功時と失敗時の2種類の関数を引数に取る
			function(){
				//成功時はコメントリストの再読み込み
				console.log("success get comment");
				get_comment(pdf_id);
				window.location.reload();
			},
			function(XMLHttpRequest, textStatus, errorThrown){
				alert("コメントの送信に失敗しました");
				console.log(XMLHttpRequest.status);
				console.log(textStatus);
				console.log(errorThrown.message);
			}
		)
		.then(
			function(){
				const viewer = document.getElementById("viewer");
				popover(viewer, commentList);
			}
		)
	}
};


/*ajax化したので不要になった(一応残してある)*/
////コメントデータ送信
//Promise.resolve()
//.then(function(){
//	return new Promise(function(resolve, reject){
//		setTimeout(function(){
//			console.log("sending");
//			var json_data = JSON.stringify(data);
//			const xhr = new XMLHttpRequest();
//			xhr.open("POST", "/add_comment");
//			xhr.setRequestHeader("Content-Type", "application/json")
//			xhr.send(json_data);
//			 document.getElementById("reply-input").value = "";
//			resolve();
//		}, 400);
//	});
//})
//.then(function(){
//	return new Promise(function(resolve, reject){
//		setTimeout(function(){
//			window.location.reload();
//			resolve();
//		}, 300)
//	});
//})
