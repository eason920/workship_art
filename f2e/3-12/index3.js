$(document).ready(function(){
    var json,
        pageCount = 5,
        currentPageIndex = 1;
    function show(data){
        // var $content = $("#content");
        // for (var i=0;i<data.length;i++){
        //     $content.append( 
        //         $("<tr>").append( 
        //             $("<td>").append( 
        //                 $("<a>").attr("href",data[i].url ).text( data[i].title )
        //     ) ) );
        // }
        // $content.html( $content.html() );
        /*
        =============================================================================
        =============================================================================
        =============================================================================
        =============================================================================
        =============================================================================
        */ 
        var $tbody = $("<tbody>");
        for (var i = 0; i < data.length; i++) {
            $tbody.append(
                $("<tr>").append(
                    $("<td>").append(
                        $("<a>").attr("href", data[i].url).text(data[i].title)
                    )));
        }
        $("#content").html($tbody.html());
    };
    $.getJSON("data.json",function(data){
        json = data;
        show( filter( json,pageCount,currentPageIndex ) );
    });
    function filter( data , pageCount , currentPageIndex ){
        return json.filter(function(a){
            var msgIndex = data.indexOf(a);
            if( msgIndex >= pageCount * (currentPageIndex -1) && msgIndex < pageCount * currentPageIndex ){
                return true;
            }
        });
    };
    ////
    $("#first").click(function(){
        if( currentPageIndex == 1){
            alert("is first page");
            // $(this).css({"display":"none"});
        }else{
            currentPageIndex = 1;
            show( filter( json , pageCount , currentPageIndex ) );
        };

    });
    $("#prev").click(function(){
        currentPageIndex --;
        if(currentPageIndex < 1 ){
            currentPageIndex = 1;
            alert("is first page");
        }else{
            show( filter( json , pageCount , currentPageIndex ) );
        }
    });
    $("#next").click(function(){
        currentPageIndex ++;
        var maxPageIndex = Math.ceil(json.length / pageCount)
        if( currentPageIndex > maxPageIndex ){
            currentPageIndex = maxPageIndex;
            alert("is last page");
        }else{
            show( filter( json , pageCount , currentPageIndex ) );
        }
    });
    $("#last").click(function(){
        if(currentPageIndex == Math.ceil( json.length / pageCount ) ){
            alert("is last page");
        }else{
            currentPageIndex = Math.ceil(json.length / pageCount);
            show( filter( json , pageCount , currentPageIndex ) );
        }
    });
});