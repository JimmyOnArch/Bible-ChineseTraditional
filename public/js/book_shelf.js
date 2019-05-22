function init(){
	loadBookShelfOt();
	loadBookShelfNt();

	var type = getUrlParameter("type");
	if(type == "OT"){
		$("html, body").animate({ scrollTop: ($('#book_shelf_title_ot').offset().top - 50) }, 300);
	}
	else if (type == "NT"){
		$("html, body").animate({ scrollTop: ($('#book_shelf_title_nt').offset().top - 50)}, 300);
	}
}

function loadBookShelfOt(){
	$.ajax({
		url: "/books/OTBookListUTF8.txt",
		async: false,
		success: function (data){
			// console.log(data);
			dataArr = data.split("\r\n");
			// console.log(dataArr);
			var htmlStr = "";
			for(var i=0; i<dataArr.length; i++){
				bookInfoArr = dataArr[i].split(",");
				// console.log(bookInfoArr);
				if(bookInfoArr != null && bookInfoArr.length == 5){
					htmlStr += '<div class="col-md-3"><button type="button" class="center btn btn-default btn-block" onclick="loadBookCatalog(\'OT\', \'' + bookInfoArr[2] + '\')">' + bookInfoArr[0] + '</button></div>';
				}
			}
			$("#book_shelf_ot").html(htmlStr);
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) { 
			console.log(errorThrown);
    	}   
	});
}

function loadBookShelfNt(){
	$.ajax({
		url: "/books/NTBookListUTF8.txt",
		async: false,
		success: function (data){
			dataArr = data.split("\r\n");
			var htmlStr = "";
			for(var i=0; i<dataArr.length; i++){
				bookInfoArr = dataArr[i].split(",");
				if(bookInfoArr != null && bookInfoArr.length == 5){
					// console.log(bookInfoArr);
					htmlStr += '<div class="col-md-3"><button type="button" class="center btn btn-default btn-block" onclick="loadBookCatalog(\'NT\', \'' + bookInfoArr[2] + '\')">' + bookInfoArr[0] + '</button></div>';
				}
			}
			$("#book_shelf_nt").html(htmlStr);
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) { 
			console.log(errorThrown);
    	}   
	});
}

function loadBookCatalog(type, book){
	// console.log("loadBookCatalog");
	// console.log(bookType);
	// console.log(book);
	var url = "/bible/book_catalog?type=" + type + "&book=" + book;
	window.location = url;
}