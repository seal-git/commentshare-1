//viewer内のコメント付き要素をハイライトする
/*
const viewer = document.getElementById("viewer");
viewer.onmousemove =function(){	//viwer要素上でmousemoveしたら発火
	var hover = $(":hover");	//カーソル上の要素を全て返す
	Object.keys(hover).forEach(function(key){	//連想配列をforEachするときの書き方(途中でbreakはできない)
		if(hover[key].tagName == "SPAN"){	//カーソルがspanを指していたら
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

				//カーソルの指すspanについているコメントのリストを返す
				var target = commentList.filter(function(comment){
					return(comment["span-left"] === left)
				});
				target = target.filter(function(comment){
					return(comment["span-top"] === top)
				});

				//カーソルの指すspanにコメントがついていれば表示する
				if(target.length){
					var commentTarget = target;
					//要素の背景色の変更
					hover[key].style.backgroundColor = "red";

					//吹き出しを表示(jquery.balloon.jsから)
					$(hover[key]).balloon({
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
				}
			}
			hover[key].onmouseleave = function(){
					hover[key].style.backgroundColor = "white"
			}
		}
	});
}
*/