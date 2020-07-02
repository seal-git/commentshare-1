
$(window).on('load',function(){
	console.log("overlay")
})

const a = document.getElementById("viewer");

a.onmouseover = function(){
	var pages = a.getElementsByClassName("page");
	// console.log(pages.item(0).dataset.pageNumber);
	var page1;
	for(var i=0;i<pages.length;i++){
		if(pages.item(i).dataset.pageNumber=="1"){
				// カスタムデータ属性の2番目以降のハイフン以下はハイフン直後を大文字にする
			page1 = pages.item(i);
			break;
		}
	}
	console.log(page1);
	console.log(page1.getElementsByClassName("textLayer").item(0).getElementsByTagName("span").item(1).textContent);
	console.log(page1.getElementsByClassName("textLayer").item(0).getElementsByTagName("span").item(1).textContent);
	function overlay(event){
		console.log("cmment")
		console.log(event.target.textContent);
	}
	var chars = page1.getElementsByTagName("span");
	for(var i=0;i<chars.length;i++){
		console.log(chars[i]);
		chars[i].onmouseover = overlay();
	}


}

