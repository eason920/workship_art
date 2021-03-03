$(function() {
    var json;
    function show(data){
        var html = "";
        for (var i = 0; i < data.length; i++) {
            html += "<tr>";
            html += "<td>" + data[i]["date"] + "</td>";
            html += "<td>" + data[i]["className"] + "</td>";
            html += "<td>" + data[i]["peoples"] + "</td>";
            html += "<td>" + data[i]["tw"] + "</td>";
            html += "</tr>";
        }
        $("#content").html(html);
//         console.log(`
// json[1]["tw"] is ${typeof json[1]["tw"]}
// ${customer(json[1]["tw"])}
// `);
    };
    $.getJSON("data.json", function(data) {
        json = data;
        show(json);
    });
    $(".bordered th").click(function(){
        var $this = $(this);
        $this.siblings().removeClass();
        if( $this.hasClass("up") ){
            $this.attr("class","down");
        }else{
            $this.attr("class","up");
        }
        ///////
        var key = $this.data("key");
        var direction = $this.attr("class");
        sort(key,direction);
        show(json);
    });
    function sort(key,direction){
        // console.log(key);
        // console.log(json[4][key]);
        // var name = json.key;
        json.sort(function(a,b){
            if( direction == "down" ){
                // new -> old
                console.log(customer(a[key]));
                if (customer(a[key]) < customer(b[key]) ){
                    return 1;
                }else{
                    return -1;
                }
            }else{
                // dir is empty or up
                // old -> new
                if (customer(a[key]) > customer(b[key]) ){
                    return 1;
                }else{
                    return -1;
                }
            }
        });
    };
    function customer(input){
        if( typeof input == "string" ){
            input = input.replace("一",1);
            input = input.replace("二",2);
            input = input.replace("三",3);
            input = input.replace("四",4);
            input = input.replace("五",5);
        }
        return input;
    }
    
});