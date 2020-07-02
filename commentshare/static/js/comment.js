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
	var Selected = window.getSelection()
	var SelectedText = Selected.toString();
	if(SelectedText.length>0&&SelectedText.length<15){
		console.log(SelectedText);
		// console.log(Selected);
		return Selected;
	}else{
		return 0;
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
		var clientRect = Selected.focusNode.parentElement.getBoundingClientRect();
		console.log(clientRect.left, clientRect.top);
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
		form.onsubmit=function(){
			// alert(o.value+"\n"+clientRect.left+","+ clientRect.top);
			// alert(clientRect.left+","+ clientRect.top);
			var data = [
				{"name" : "test_user"},
				{"comment" : o.value},
				// {"node" : Selected},
				{"time" : Date.now()}
			]
			var json_data = JSON.stringify(data);
			const xhr = new XMLHttpRequest();
			xhr.open("POST", "/add_comment");
			xhr.setRequestHeader("Content-Type", "application/json")
			xhr.send(json_data);
			// console.log(data["node"]);
			o.value = "";
			document.getElementById("viewerContainer").removeChild(form);
		}



	}
}



