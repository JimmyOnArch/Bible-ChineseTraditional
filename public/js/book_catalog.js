function init(){
	var type = getUrlParameter("type");
	var book = getUrlParameter("book");
	loadBookCatalog(type, book);
}

function loadBookCatalog(type, book){
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
	$("#book_type").click(function() {
		var url = "/bible/book_shelf?type=" + type;
		window.location = url;
	});
	$.ajax({
		url: bookUrl,
		success: function (data){
			// console.log(data);
			dataArr = data.split("\r\n");
			// console.log(dataArr);
			var htmlStr = "";
			for(var i=0; i<dataArr.length; i++){
				bookInfoArr = dataArr[i].split(",");
				console.log(bookInfoArr);
				if(bookInfoArr[2] == book){
					var catalogCount = bookInfoArr[4];
					$("#book_name").html(bookInfoArr[0]);
					var htmlStr = "";
					for(var i = 1; i<=catalogCount; i++){
						htmlStr += '<div class="col-md-2"><button type="button" class="center btn btn-default btn-block" onclick="loadBookContent(\'' + type + '\', \'' + bookInfoArr[2] + '\', \'' + i + '\')">' + i + '</button></div>';
					}
					$("#book_catalog").html(htmlStr);
					break;
				}
			}
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) { 
			console.log(errorThrown);
    	}   
	});
}

function loadBookContent(type, book, chapter){
	var url = "/bible/book_content?type=" + type + "&book=" + book + "&chapter=" + chapter;
	window.location = url;
}