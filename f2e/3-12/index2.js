$(function() {
    var json;
    var pagerCount = 3; //每頁顯示幾筆
    var currentIndex = 1; //目前在第幾頁
    function show(data) {
        var $tbody = $("<tbody>");
        for (var i = 0; i < data.length; i++) {
            $tbody.append(
                $("<tr>").append(
                    $("<td>").append(
                        $("<a>").attr("href", data[i].url).text(data[i].title)
                    )
                )
            );
        }
        $("#content").html($tbody.html());
    }
    $.getJSON("data.json", function(data) {
        json = data;
        show(pager(json, pagerCount, currentIndex));
		});
		//             json  5       1
		//                   5       2
		//                   5       3
    function pager(data,pagerCount,pageIndex) {
				// var pagerCount,pageIndex; 
				// 變數欄位要開出去給show()填寫的，不能限制其生命周期在 page() 中
        return data.filter(function(a) {
						var msgIndex = data.indexOf(a); //目前資料的索引位置
					if (msgIndex >= pagerCount * (pageIndex - 1) && msgIndex < pagerCount * pageIndex) {
						// 0 >=   5    x    1 - 1       1   <   5 x 1
						// 0 >=   0                     0   <   5 
						// ----------------------------------------------
						// 1~4 >=   0                   1~4 <   5    (o)(o)
						// 5  >=    0                   5   <   5    (o)(X)
						////////////////////////////////////////////////
						// 5  >= 5    x     2-1        5   <  5  x  2
						// 5  >= 5                     5   <  10
						//-----------------------------------------------
						// 6~9 >= 5                     6   < 10    (o)(o)
						// 10  >= 5                   10   <  10    (o)(x)
						///////////////////////////////////////////////////
						// 10 >=  
						/*
						~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
						~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
						~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
						~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
						~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
						*/
						// msgIndex >= pagerCount * (pageIndex - 1) && msgIndex < pagerCount * pageIndex
						// pagerCount = 3
						//--------------------------------------
						// pageIndex = 1
						// 0 >= 3 x (1-1) && 0 < 3 x 1 
						//   => 0 >= 0 && 0 < 3 (o)(o)
						// 1~2 >= 0 && 1~2 < 3  (o)(o)
						// 3 >= 0 && 3 < 3      (o)(x)
						//--------------------------------------
						// pageIndex = 2
						// 3 >= 3 x (2-1) && 3 < 3 x 2 
						//   => 3 >= 3 && 3 < 6 (o)(o)
						// 4~5 >= 3 && 4~5 < 6  (o)(o)
						// 6 >= 3 && 6 < 6      (o)(o)
							return true;
						}
        });
    }
    $("#first").click(function() {
        currentIndex = 1;
        show(pager(json, pagerCount, currentIndex));
    });
    $("#prev").click(function() {
        currentIndex--;
        if (currentIndex < 1) {
            currentIndex = 1;
            alert("沒有上一頁了");
        } else {
            show(pager(json, pagerCount, currentIndex));
        }
    });
    $("#next").click(function() {
        currentIndex++;
        var maxPagerIndex = Math.ceil(json.length / pagerCount);
        if (currentIndex > maxPagerIndex) {
            currentIndex = maxPagerIndex;
            alert("沒有下一頁了");
        } else {
            show(pager(json, pagerCount, currentIndex));
        }
    });
    $("#last").click(function() {
        currentIndex = Math.ceil(json.length / pagerCount);
        show(pager(json, pagerCount, currentIndex));
    });
});