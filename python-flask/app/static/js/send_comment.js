function checkSelection(Selected){
	//selectionの有効性チェックする関数
	//選択範囲がなかったり広すぎたら0を返す
	//balloon内の要素が選択されても0を返す
	console.log(Selected.anchorNode.parentElement)
	var anchorClassName = Selected.anchorNode.parentElement.className.split(" ");

	if(anchorClassName.indexOf("balloon")!=-1){	//選択範囲がballoon内
		console.log("aC", anchorClassName.indexOf("balloon"));
		return 0;
	}else if(Selected.toString().length<1||Selected.toString().length>15){	//選択範囲が不正
		console.log(Selected.toString().length);
		return 0;
	}else{
		return Selected;
	}
}

function toURL(txt){
	//コメントがURLならリンクにする関数
	// if (txt.match(/(http[s]?|ftp):\/\/.+?\..+\w$/i) == null){
	if (txt.match(/(http[s]?|ftp):\/\/.+?/i) == null){	//URLの正規表現は要検討
		console.log("urlfalse");
		return(txt);
	}else{
		console.log("urltrue");
		return("<a href="+txt+" target=\"_blank\">"+txt+"</a>");
	}
}


window.onclick = function() {
	var Selected = window.getSelection();
	Selected = checkSelection(Selected);
	console.log("selected", Selected.toString());

	if(Selected==0){
		//選択されてない状態でフォーム以外がクリックされたらフォームが消える

		var hover = $(":hover");	//現在カーソルがかかっている要素を返す
		var flag = true;	//カーソルがフォームにかかっていなかったらtrue
		this.Object.keys(hover).forEach(function(key){	//連想配列をforEachするときの書き方(途中でbreakはできない)
			// console.log(hover[key])
			if(hover[key].id == "comment-form"){
				flag = false;
			}
		});
		//カーソルがフォームにかかっていなかったらフォームを消す
		if(flag){
			var inputForm = document.getElementById("comment-form");
			if(inputForm){
				document.getElementById("viewerContainer").removeChild(inputForm);
			}
		}
	}else{
		//既にフォームがあったら削除する
		var inputForm = document.getElementById("comment-form");
		if(inputForm){
			document.getElementById("viewerContainer").removeChild(inputForm);
		}

		//選択されたノードの画面内の座標を取得
		var clientRect = Selected.focusNode.parentElement.getBoundingClientRect();
		console.log(clientRect.left, clientRect.top);
		console.log(Selected);
		console.log(Selected.anchorNode);

		//選択されたノードの(left,top)をviewerサイズ(1000,1000)で正規化した値を取得
		viewerStyle = window.getComputedStyle(Selected.anchorNode.parentElement.parentNode.parentNode)
		var viewerWidth = parseFloat(viewerStyle.getPropertyValue("width"));
		var viewerHeight = parseFloat(viewerStyle.getPropertyValue("height"));
		var node_style = window.getComputedStyle(Selected.anchorNode.parentElement);
		var node_top = node_style.getPropertyValue("top").slice(0, -2);
		node_top = parseFloat(node_top, 10)/viewerHeight*1000.0;
		var node_left = node_style.getPropertyValue("left").slice(0,-2);
		node_left = parseFloat(node_left, 10)/viewerWidth*1000.0;

		//選択されたノードのpageを取得
		var node_page = Selected.anchorNode.parentElement.parentNode.parentNode.dataset.pageNumber;
		console.log("node_left", node_left, "node_top", node_top, "node_page", node_page);

		//入力フォームフィールドを作成してviewerContainerの下に入れる
		form = document.createElement("form");
		form.setAttribute("id","comment-form");
		form.style.position = "fixed";
		form.style.top = (clientRect.top-20)+"px";
		form.style.left = (clientRect.left+20)+"px";
		document.getElementById("viewerContainer").appendChild(form);

		//入力フォームを作成してformの下に入れる
		inputForm = document.createElement("input");
		inputForm.setAttribute("type","text");
		inputForm.setAttribute("id","comment-input");
		inputForm.setAttribute("name","comment-input");
		document.getElementById("comment-form").appendChild(inputForm);

		//送信ボタンを作成してformの下に入れる
		submitForm = document.createElement("input");
		submitForm.setAttribute("type","button");
		submitForm.setAttribute("value", "送信")
		submitForm.setAttribute("id","comment-submit");
		submitForm.setAttribute("onclick","OnButtonClick(event)");
		submitForm.style = "WIDTH:50px; HEIGHT:20px"
		document.getElementById("comment-form").appendChild(submitForm);

		//コメント情報をjson型文字列にしてサーバに送信する
		submitForm.onclick=function(event){
			var value =document.getElementById("comment-input").value;
			if(value.length == 0){
				alert("コメントが入力されていません");
				return(-1);
			}else{
				//コメントデータ形成
				var value_url = toURL(document.getElementById("comment-input").value);
				var now = new Date();
				var data = {
					"name" : "test_user",
					"time" : now.toISOString(),
					"value" : value_url,
					"pdf_id" : pdf_id,
					"span-page" : node_page,
					"span-left" : node_left,
					"span-top" : node_top
				}
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
						console.log("success");
						get_comment(pdf_id);
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
						inputForm.value = "";
						document.getElementById("viewerContainer").removeChild(form);
					}
				)
			}
		}

/*ajax化したので不要になった(一応残してある)*/
//			Promise.resolve()
//			.then(function(){
//				//コメントの送信
//				return new Promise(function(resolve, reject){
//					setTimeout(function(){
//						console.log("sending");
//						var json_data = JSON.stringify(data);
//						const xhr = new XMLHttpRequest();
//						xhr.open("POST", "/add_comment");
//						xhr.setRequestHeader("Content-Type", "application/json")
//						xhr.send(json_data);
//						// inputForm.value = "";
//						// document.getElementById("viewerContainer").removeChild(form);
//						resolve();
//					}, 350);
//				});
//			})
//			.then(function(){
//				//画面の更新
//				return new Promise(function(resolve, reject){
//					setTimeout(function(){
//						window.location.reload();
//						resolve();
//					}, 300)
//				});
//			})
//		}

	}
}
//吹き出し内の送信ボタンが押されたら発火
//function OnButtonClick(e){
//	var value = document.getElementById("comment-input").value
//	console.log(document.getElementById("comment-input"));
//	if(value.length == 0){
//		alert("コメントが入力されていません");
//		return(-1);
//	}else{
//		//コメントデータ形成
//		var now = new Date();
//		var value_url = toURL(document.getElementById("comment-input").value);
//		var page = Number(e.target.parentElement.parentElement.dataset.page);
//		var top = Number(e.target.parentElement.parentElement.dataset.top);
//		var left = Number(e.target.parentElement.parentElement.dataset.left);
//		console.log({"page":page, "left":left, "top":top})
//		console.log(document.getElementById("comment-input").value)
//		var data = {
//			"name" : "test_user",
//			"time" : now.toISOString(),
//			"value" : value_url,
//			"pdf_id" : pdf_id,
//			"span-page" : page,
//			"span-left" : left,
//			"span-top" : top
//		}
//		console.log(data);
//
//		//コメントデータ送信
//		Promise.resolve()
//		.then(function(){
//			return new Promise(function(resolve, reject){
//				setTimeout(function(){
//					console.log("sending");
//					var json_data = JSON.stringify(data);
//					const xhr = new XMLHttpRequest();
//					xhr.open("POST", "/add_comment");
//					xhr.setRequestHeader("Content-Type", "application/json")
//					xhr.send(json_data);
//					 document.getElementById("comment-input").value = "";
//					resolve();
//				}, 400);
//			});
//		})
//		.then(function(){
//			return new Promise(function(resolve, reject){
//				setTimeout(function(){
////					window.location.reload();
//					resolve();
//				}, 300)
//			});
//		})
//	}
//};



