function checkSelection(Selected){
	//selectionの有効性チェック
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


window.onclick = function() {
	var Selected = window.getSelection();
	Selected = checkSelection(Selected);
	console.log(Selected.toString());

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

		//選択されたノードのleft, top, pageを取得
		var node_style = window.getComputedStyle(Selected.anchorNode.parentElement);
		var node_top = node_style.getPropertyValue("top").slice(0, -2);
		node_top = parseInt(node_top, 10);
		var node_left = node_style.getPropertyValue("left").slice(0,-2);
		node_left = parseInt(node_left, 10);
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
		submitForm.style = "WIDTH:50px; HEIGHT:20px"
		document.getElementById("comment-form").appendChild(submitForm);

		//コメント情報をjsonにしてサーバに送信する
		submitForm.onclick=function(event){
			console.log("event", event);
			var data = {
				"name" : "test_user",
				"time" : Date.now(),
				"value" : document.getElementById("comment-input").value,
				"span-page" : node_page,
				"span-left" : node_left,
				"span-top" : node_top
			}

			console.log("data",data);
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
						inputForm.value = "";
						document.getElementById("viewerContainer").removeChild(form);
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
		}



	}
}



