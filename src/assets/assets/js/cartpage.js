(function() {
	"use strict";
	$(document).ready(function(){
		input_counter_number();
	});
	function input_counter_number(){
		var sub_btn = $('.counter-number .sub');
		sub_btn.on('click',function(){
			if($(this).siblings('input').val() > 0){
				$(this).siblings('input').val($(this).siblings('input').val() - 1);
			}
		});
		var add_btn = $('.counter-number .add');
		add_btn.on('click',function(){
			if($(this).siblings('input').val() < 999){
				$(this).siblings('input').val(+$(this).siblings('input').val() + 1);
			}
		});
	}
})();
