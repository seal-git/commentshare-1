
$(window).on('load',function(){
	console.log("overlay")
})

var commentList = [
{"value": "コメント1", "span-page":2, "span-left": 219, "span-top": 711, "offset": -200},
{"value": "コメント2", "span-page":2, "span-left": 251, "span-top": 623, "offset": 0},
{"value": "コメント3", "span-page":2, "span-left": 251, "span-top": 623, "offset": 50}
];

const a = document.getElementById("viewer");
a.onmousemove =function(){
	var hover = $(":hover");
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

				var target = commentList.filter(function(comment){
					console.log(comment["span-left"]);
					return(comment["span-left"] === left)
				});
				target = target.filter(function(comment){
					return(comment["span-top"] === top)
				});
				console.log("target", target[0]);
				if(target.length){
					var commentTarget = target[0];
					//要素の背景色の変更
					hover[key].style.backgroundColor = "red";

					//吹き出しを表示(jquery.balloon.jsから)
					$(hover[key]).balloon({
						position: "right",
						offsetX : commentTarget["offset"],
						showDuration: 10,
						tipSize: 20,
						css: {
						"color": "#0000ff",
						"font-size": "20px",
						"font-weight": "bold",
						"border": "solid 2px #111",
						"padding": "0px",
						"background-color": "#eee",
						"opacity": 1,
						},
						"html":true,
						contents: makeComment(commentTarget.value)
					});
				}

			}
			hover[key].onmouseleave = function(){
					hover[key].style.backgroundColor = "white"
			}
		}
	});
}

const b = document.getElementById("viewer");

// a.onmouseover = function(){
	var pages = a.getElementsByClassName("page");
	console.log(pages.item(0).dataset.pageNumber);
	var page1;
	for(var i=0;i<pages.length;i++){
		if(pages.item(i).dataset.pageNumber=="1"){
				// カスタムデータ属性の2番目以降のハイフン以下はハイフン直後を大文字にする
			page1 = pages.item(i);
			break;
		}
	}
	// console.log(page1);
	// console.log(page1.getElementsByClassName("textLayer").item(0).getElementsByTagName("span").item(1).textContent);

	var chars = page1.getElementsByTagName("span");
	for(var i=0;i<chars.length;i++){
		// console.log(chars[i]);
		chars[i].onmouseover = function(event){
		console.log("cmment")
		console.log(event.target.textContent);
		console.log(event.target);
		}
	};


// }

