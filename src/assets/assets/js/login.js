(function() {
	"use strict";

	$(document).ready(function($) {
		centerForm();
	});

	$(window).resize(function() {
		centerForm();
	});

	function centerForm(){
		var form_box = $('.form-box');
		var win_height = $(window).height();
		var form_height = form_box.height();
		if(win_height > form_height){
			form_box.css('top', ($(window).height() - $('.form-box').height())/2 + 'px');
		}
	}

})();