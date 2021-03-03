$(document).ready(function(){
	var json;
	// console.log(json);
	function show(json){
		$.get('template.html',function(html){
			$('#list').html(render(html,json));
		});
	}

	$.getJSON('data.json',function(data){
		// console.log(data);
		json = data;
		show(json);
	});

	$('#search').keyup(function(){
		var value = $('#search').val().toLowerCase(),
			source;
		show(
			json.filter(function (a) {
				source = a.name.toLowerCase();
				// console.log(source);
				return source.indexOf(value) > -1;
			})
		);
	});
	


});