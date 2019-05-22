function init(){
	var type = getUrlParameter("type");
	var book = getUrlParameter("book");
	var chapter = getUrlParameter("chapter");
	loadBookContent(type, book, chapter);
}

function loadBookContent(type, book, chapter){
	var bookUrl = "";
	if (type == "OT"){
		bookUrl = "/books/OTBookListUTF8.txt";
		$("#book_type").html("舊約");
	}
	else if (type == "NT"){
		bookUrl = "/books/NTBookListUTF8.txt";
		$("#book_type").html("新約");
	}
	else{

	}
	$.ajax({
		url: bookUrl,
		success: function (data){
			// console.log(data);
			dataArr = data.split("\r\n");
			// console.log(dataArr);
			var htmlStr = "";
			for(var i=0; i<dataArr.length; i++){
				bookInfoArr = dataArr[i].split(",");
				// console.log(bookInfoArr);
				if(bookInfoArr[2] == book){
					var catalogCount = bookInfoArr[4];
					$("#book_name").html(bookInfoArr[0]);
					$("#book_name").click(function() {
						var url = "/bible/book_shelf?type=" + type;
						window.location = url;
					});
					$("#return_button_book").click(function() {
						var url = "/bible/book_shelf?type=" + type;
						window.location = url;
					});
					break;
				}
			}
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) { 
			console.log(errorThrown);
    	}   
	});
	$("#book_chapter").html("第 " + chapter + " 章");
	var url = "/bible/book_catalog?type="+ type +"&book=" + book;
	$("#book_chapter").attr({href: url});
	$("#return_button_chapter").click(function() {
		window.location = url;
	});
	// book_catalog?type=NT&book=Romans
	var bookUrl = "/books/" + type + "/" + book + "_" + chapter + ".txt";
	$.ajax({
		url: bookUrl,
		success: function (data){
			// console.log(data);
			dataArr = data.split("\r\n");
			console.log(dataArr);
			var htmlStr = "";
			for(var i=0; i<dataArr.length; i++){
				try{
					contentArr = dataArr[i].split(",");
					htmlStr += "<p>" + contentArr[0] + "&nbsp;&nbsp;" + contentArr[1] + "</p>";
				}
				catch(e){
					
				}
			}
			$("#book_content").html(htmlStr);
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) { 
			console.log(errorThrown);
    	}   
	});
}
