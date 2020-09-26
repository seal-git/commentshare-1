//viewer内のコメント付き要素をハイライトする関数

var highlight = function(viewer, commentList){
	//loadされているページとそのページのコメントを配列に入れる
	var pageList = Array.from(viewer.getElementsByClassName("page"));
	pageList = pageList.filter(p => p.dataset.loaded);
	var pageNumList = pageList.map(p => p.dataset.pageNumber);
	commentList = commentList.filter(p => pageNumList.includes(p["span-page"]))
	//console.log('high light')
	//console.log(commentList)

	//ページの高さと幅を取得
	pageStyle = window.getComputedStyle(pageList[0])
	var pageWidth = parseFloat(pageStyle.getPropertyValue("width"));
	var pageHeight = parseFloat(pageStyle.getPropertyValue("height"));

	for(var i=0; i<pageList.length; i++){
		//iページのspanを配列に入れる
		var spanList = pageList[i].getElementsByTagName("span");
		var spanInfoList = [];
		for(var j=0; j<spanList.length; j++){
			//spanのleftとtopを(1000,1000)で正規化する
			var spanStyle = window.getComputedStyle(spanList[j]);
			var spanLeft = spanStyle.getPropertyValue("left").slice(0, -2);
			spanLeft = parseFloat(spanLeft, 10)/pageWidth*1000.0;
			var spanTop = spanStyle.getPropertyValue("top").slice(0, -2);
			spanTop = parseFloat(spanTop, 10)/pageHeight*1000.0;
			//正規化したspanをspanInfoListに入れる
			var spanInfo = {left: spanLeft, top: spanTop};
			spanInfoList.push(spanInfo);
		}
		// console.log("info",spanInfoList)
		//iページのコメントを対応しているspan
		var commentListOnePage = commentList.filter(p => p["span-page"]==pageNumList[i]);
		for(var j=0; j<commentListOnePage.length; j++){
			var spanCommentLeft = commentListOnePage[j]["span-left"];
			var spanCommentTop = commentListOnePage[j]["span-top"];
			for(var k=0; k<spanInfoList.length; k++){
				var spanLeft = spanInfoList[k]["left"];
				var spanTop = spanInfoList[k]["top"];
				if(Math.abs(spanCommentLeft-spanLeft)<1&&Math.abs(spanCommentTop-spanTop)<1){
					spanList[k].style.backgroundColor = "green";
					break;
				}
			}
		}
	}
}
