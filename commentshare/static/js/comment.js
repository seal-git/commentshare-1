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
	if(o){
		document.getElementById("viewerContainer").removeChild(o);
	}
	if(Selected!=0){

		console.log(a);
		console.log(a.length);
		var clientRect = Selected.focusNode.parentElement.getBoundingClientRect();
		console.log(clientRect.left, clientRect.top);
		form = document.createElement("form");
		// form.setAttribute("class","form-inline");
		form.setAttribute("id","comment-form");
		form.style.position = "fixed";
		form.style.top = (clientRect.top-20)+"px";
		form.style.left = (clientRect.left+20)+"px";
		document.getElementById("viewerContainer").appendChild(form);
		d = document.createElement("div");
		d.setAttribute("id","form-group1");
		d.setAttribute("class","form-group");
		document.getElementById("comment-form").appendChild(d);
		o = document.createElement("input");
		o.setAttribute("type","email");
		o.setAttribute("id","comment-input");
		o.setAttribute("class","form-control");
		document.getElementById("form-group1").appendChild(o);
		p = document.createElement("button");
		p.setAttribute("type","submit");
		p.setAttribute("value", "送信")
		p.setAttribute("class","btn btn-default");
		p.setAttribute("id","comment-submit");
		p.style = "WIDTH:100px; HEIGHT:20px"
		document.getElementById("form-group1").appendChild(p);

	}
}


