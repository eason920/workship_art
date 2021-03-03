$(function(){
	var json;
	$.getJSON('data.json',function(data){
		json = data;
		show(json);
	})
	function show(json){
		$.get('template.html',function(html){
			$('#list').html(render(html,json));
		})
	}
	$('#search').keyup(function(){
		var val = $(this).val().toLowerCase();

		// console.log(val);
		show(
			json.filter(function(a){
				console.log(a.name);
				var source = a.name.toLowerCase();
				return source.indexOf(val) > -1; 
			})
		);
	});
});