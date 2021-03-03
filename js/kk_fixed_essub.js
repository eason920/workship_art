$(function(){
	//alert("new start");
	var _ww =$(window).width();
	var _sub = $("#essub");
	if( _ww > 767 ){
		$(window).scroll(function(){
			var _wst = $(window).scrollTop();
			var _subtop = _wst - 500;
			if( _wst > 490 ){
				_sub.css({top:_subtop});
			};
			if( _wst > 2723 ){
				
				_sub.css({top:"auto",bottom:0});
			};
			if( _wst <= 489){
				_sub.removeAttr("style");
			}
		});
	}
});