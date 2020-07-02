/**
 *
 */



window.onload = function(){

	document.getElementsByTagName.onselect = function(){
		console.log('2');
		getText();
	};
}
function getText(){
	var SelectedText;
	var Selected = window.getSelection()
	SelectedText = Selected.toString();
	if(SelectedText.length>0&&SelectedText.length<15){
		console.log(SelectedText);
		// console.log(Selected);
		return Selected;
	}else{
		return 0;
	}
}


window.onclick = function() {
	var a = document.getElementsByClassName("textLayer");
	var Selected = this.getText();
	var o = document.getElementById("comment-form");

	// var a = document.getElementsByClassName("textLayer");
	// var Selected = this.getText();
	// var o = document.getElementById("comment-form");
	// if(o){
	// 	var isProcess = false;
	// 	o.on({
	// 		"keypress": function(e){
	// 			if(!e.ctrlKey&&!e.altKey){
	// 				isProcessed = true;
	// 			}
	// 		}
	// 	})
	// 	if(isProcess){
	// 	document.getElementById("viewerContainer").removeChild(o);
	// }
	if(Selected!=0){
		var o = document.getElementById("comment-form");
		if(o){
			document.getElementById("viewerContainer").removeChild(o);
		}
		console.log(a);
		console.log(a.length);
		var clientRect = Selected.focusNode.parentElement.getBoundingClientRect();
		console.log(clientRect.left, clientRect.top);
		console.log(Selected.anchorNode);
		form = document.createElement("form");
		form.setAttribute("id","comment-form");
		form.style.position = "fixed";
		form.style.top = (clientRect.top-20)+"px";
		form.style.left = (clientRect.left+20)+"px";
		document.getElementById("viewerContainer").appendChild(form);
		o = document.createElement("input");
		o.setAttribute("type","text");
		o.setAttribute("id","comment-input");
		document.getElementById("comment-form").appendChild(o);

		p = document.createElement("input");
		p.setAttribute("type","submit");
		p.setAttribute("value", "送信")
		p.setAttribute("id","comment-submit");
		p.style = "WIDTH:50px; HEIGHT:20px"
		document.getElementById("comment-form").appendChild(p);

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



