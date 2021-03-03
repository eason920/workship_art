$(document).ready(function(){
		var eason;
		function show(data){
			$.get("template.html",function(html){
				$("#list").html( render(html,data) );
				// console.log( render(html,data) );
				// console.log( eason );
			})
			
		};
		$.getJSON("data.json",function(data){
			eason = data;
			show(data);
			// console.log( eason );
		});
		// console.log( eason );
		$("#search").keyup(function(){
			var result = eason.filter(function(ea){
				var name= ea.name.toLowerCase();
				var search = $("#search").val().toLowerCase();
				if( name.indexOf(search) <= -1 ){
					return false;
				}else{
					return true;
				}
			});
			show(result);
		});
});
var a=5;
function run(a){
	a = 3;
};
run(a);
console.log("a is 「 " + a + " 」");