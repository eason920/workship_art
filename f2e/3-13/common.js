$(function() {
    function build(data, idSearchParent) {
        var html = "";
        for (var i = 0; i < data.length; i++) {
            if (data[i].parent == idSearchParent) {
                html += "<li>";
                html += "<a>" + data[i].name + "</a>";
                html += "<ul>" + build(data, data[i].id) + "</ul>";
                html += "</li>";
            }
        }
        return html;
    }
    $.getJSON("data0.json", function(data) {
        $(".navigation").html(build(data, 0));
    });
    $(".navigation").on("mouseenter", "a", function() {
        var $parent = $(this).parent();
        var link = "";
        while (!$parent.hasClass("navigation")) {
            if ($parent.is("li")) {
                link = "＞" + $parent.find(">a").text() + link;
            }
            $parent = $parent.parent();
        }
        $(".link").html(link.substr(1));
    });
    $(".navigation").on("mouseleave", "a",function(){
        $(".link").html("");
    })
});
