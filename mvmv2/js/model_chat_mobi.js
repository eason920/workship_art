//!171018
$(function(){
	// 輸人框自動長高
	$(".mm_chat_talk_txt")
	.css("overflow-y","hidden")
	.bind("keydown keyup",function(){
		$(this).height('0px').height($(this).prop("scrollHeight")+"px");
	}).keydown();
	// 打開手機版聊天室
	var _var_scrolltop_before;
	_tag_ww = $(window);
	_tag_bar = $(".mdb_chat_box_mobi_title");
	_tag_mask = $(".ani_mask");
	_tag_bbff = $("#mmBody,#mmfooter");
	_tag_chat = $("#mdb_chat_box_mobi");
	_tag_arrow = $(".mdb_chat_box_mobi_title_arrow");
	_btn_open = $(".mdb_chat_box_mobi_title_name");
	_btn_close = $(".mdb_chat_box_mobi_title_client");
	_btn_open.click(function(){
		_var_scrolltop_before = _tag_ww.scrollTop();
		//action 1
		_var_mask_height = _tag_ww.height() - 43 - 42;
		_tag_mask.css({"height":_var_mask_height,"transition":".15s"});
		document.getElementById("chat_mobi_arrow").src="img/chat/turn_down.png";
		//action 2
		setTimeout(function(){
			_open_action2();
		},200);
		function _open_action2(){
			////_tag_bbff.css({"display":"none"});
			_tag_bbff.css({"visibility":"hidden","position":"fixed","overflow":"hidden"});
			_tag_chat.css({"display":"block"});
			_tag_bar.css({"top":"43px","bottom":"auto"});
			_tag_ww.scrollTop(9999);
			//action 3
			setTimeout(function(){
				_open_action3();
			},50);//!! ststem responsive time for OPEN
		};
		function _open_action3(){
			_tag_mask.css({"transition":".45s","opacity":"0"});
			// action 4
			setTimeout(function(){
				_open_action4();
			},450);
		}
		function _open_action4(){
			_tag_mask.removeAttr("style");
			// _tag_arrow.css({"transform":"rotate(90deg"});
			
		};
		return false;
	});
	// 關閉手機版聊天室
	_btn_close.click(function(){
		// action 1
		_var_mask_height = _tag_ww.height() - 43 - 42;
		_tag_mask.css({"opacity":"0","height":_var_mask_height});
		
		// action 2
		setTimeout(function(){
			_close_action2();
		},100);
		function _close_action2(){
			_tag_mask.css({"transition":".15s","opacity":"1"});
			
			//action 3
			setTimeout(function(){
				_close_action3();
			},150);
		};
		function _close_action3(){
			_tag_bar.removeAttr("style");
			_tag_bbff.removeAttr("style");
			_tag_chat.removeAttr("style");
			_tag_ww.scrollTop(_var_scrolltop_before);
			document.getElementById("chat_mobi_arrow").src="img/chat/turn_up.png";
			// action 4
			setTimeout(function(){
				_close_action4();
			},50);//!! system responsive time for CLOSE
		};
		function _close_action4(){
			_tag_mask.css({"transition":".2s","height":"0"});
			// action 5
			setTimeout(function(){
				_close_action5();
			},200);
		}
		function _close_action5(){
			_tag_mask.removeAttr("style");
			// _tag_arrow.removeAttr("style");
			
		};
		return false;
	});

});