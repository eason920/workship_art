$(function(){
	_HH=$(window).height()-43;
	$("iframe").css({height:_HH});
	$(window).resize(function(){
		_HH=$(window).height()-43;
		$("iframe").css({height:_HH});
	});
	////
	_ww=$(window).width();
	if( _ww < 1024 ){
		// alert("is mobi");
		$(".mobititle_link").click(function(){
			$("#navi").toggleClass("is-open");
		});
		$("#navi > ul > li > a").click(function(){
			$(".sub").slideUp(80);
			$(this).parent().find(".sub").delay(100).slideDown(500);
		});
		$(".sub a").click(function(){
			$("#navi").removeClass();
		});
	}
});