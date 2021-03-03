$(function(){
	var json;
	function show(json){
		var html = '';
		for(a in json){
			html += '<tr>'
			for(b in json[a]){
				html += '<td>'+ json[a][b] +'</td>'
			}
			html += '</tr>'
		}
		$('#content').html(html);
	};

	$.getJSON('data.json',function(data){
		json = data;
		show(json);
	});

	function sort(key,direct){
		// console.log(json);
		if( direct === 'down'){
			// console.log('down');
			json = json.sort(function(p,n){
				if(p.key > n.key){
					return 1;
				}else{
					return -1;
				}
			});
		}else if(direct === 'up'){
			// console.log('up');
			json = json.sort(function(p,n){
				if(p.key < n.key){
					return 1;
				}else{
					return -1;
				}
			});
		}
		show(json);
	}

	var $th = $('.bordered th');
	$th.click(function(){
		var $this = $(this);
		var direct;
		if( !$this.attr('class')|| $this.hasClass('up') ){
			$th.removeClass();
			$this.addClass('down');
			direct = 'down';
		}else{
			$th.removeClass();
			$this.addClass('up');
			direct = 'up';
		}

		var key = $this.data(key);
		sort(key,direct);
	});
});