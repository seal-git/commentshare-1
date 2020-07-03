/**
 *
 */


//なにしてるのかよく分からん。文法的に正しいのか？
//window.onload = function(){
//
//	document.getElementsByTagName.onselect = function(){
//		console.log('2');
//		getText();
//	};
//}

function getText(){
	//選択範囲のノードを返す
	//選択範囲がなかったり広すぎたら0を返す
	//balloon内の要素が選択されても0を返す
	var Selected = window.getSelection()
	var SelectedText = Selected.toString();
	var className = Selected.anchorNode.parentElement.className.split(" ");
	console.log(className);
	if(className.indexOf("balloon")!=-1){	//選択範囲がballoon内
		return 0;
	}else if(SelectedText.length<1||SelectedText.length>15){	//選択範囲が不正
		return 0;
	}else{
		console.log(SelectedText);
		// console.log(Selected);
		return Selected;
	}
}


window.onclick = function() {
	var Selected = this.getText();

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
			var o = document.getElementById("comment-form");
			if(o){
				document.getElementById("viewerContainer").removeChild(o);
			}
		}
	}else{
		//既にフォームがあったら削除する
		var o = document.getElementById("comment-form");
		if(o){
			document.getElementById("viewerContainer").removeChild(o);
		}

		//選択されたノードの座標を取得
		var clientRect = Selected.focusNode.parentElement.getBoundingClientRect();
		console.log(clientRect.left, clientRect.top);
		console.log(Selected);
		console.log(Selected.anchorNode);

		//入力フォームフィールドを作成してviewerContainerの下に入れる
		form = document.createElement("form");
		form.setAttribute("id","comment-form");
		form.style.position = "fixed";
		form.style.top = (clientRect.top-20)+"px";
		form.style.left = (clientRect.left+20)+"px";
		document.getElementById("viewerContainer").appendChild(form);

		//入力フォームを作成してformの下に入れる
		o = document.createElement("input");
		o.setAttribute("type","text");
		o.setAttribute("id","comment-input");
		document.getElementById("comment-form").appendChild(o);

		//送信ボタンを作成してformの下に入れる
		p = document.createElement("input");
		p.setAttribute("type","submit");
		p.setAttribute("value", "送信")
		p.setAttribute("id","comment-submit");
		p.style = "WIDTH:50px; HEIGHT:20px"
		document.getElementById("comment-form").appendChild(p);

		//コメント情報をjsonにしてサーバに送信する
		form.onsubmit=function(event){
			console.log("event", event.target.parentElement);
			var data = [
				{"name" : "test_user"},
				{"time" : Date.now()},
				{"value" : event.target.value},
				{"span-page" : o.value}
			]
			console.log("data",data);
			var json_data = JSON.stringify(data);
			const xhr = new XMLHttpRequest();
			// xhr.open("POST", "/add_comment");
			// xhr.setRequestHeader("Content-Type", "application/json")
			// xhr.send(json_data);
			o.value = "";
			document.getElementById("viewerContainer").removeChild(form);
		}



	}
}



