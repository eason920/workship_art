$(function(){
	$.getJSON('data.json',function(data){
		console.log(data);
		console.log(
			data.sort(function(a,b){
				if(a['peoples'] < b['peoples']){
					return 1
				}else{
					return -1
				}
			})
		);
	});
});