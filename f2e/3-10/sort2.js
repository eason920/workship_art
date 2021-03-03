$(function () {
	var json;
	$.getJSON("data.json", function (data) {
		json = data;
		show(json);
	});
	function show(json) {
		console.log(json);
		console.log(
			json.sort(function (a, b) {
					if (a['peoples'] > b['peoples']) {
						return 1;
					}else{
						return -1;
					}
			})
		)
	}
});