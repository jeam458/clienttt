(function() {
	"use strict";

	/*responsive table*/
	$(document).ready(function(){
		scrollBtn();
		var res_table = $(".table-responsive-wrap");
		res_table.each(function() {
			var tableWrap = $(this);
			var table = $(this).children('table');
			active_arrow(tableWrap, table);
			hideArrow(tableWrap, table);
			scrollsync(tableWrap, table);
		});

	});


	$(window).resize(function(){
		initialize_table();
	});

	function initialize_table(){
		var res_table = $(".table-responsive-wrap");
		res_table.each(function() {
			var tableWrap = $(this);
			var table = $(this).children('table');
			hideArrow(tableWrap, table);
			scrollsync(tableWrap, table);
		});
	}
	

	function active_arrow(tableWrap, table){
		var wrapwidth = $(tableWrap).width();
		var tablewidth = $(table).width();
		$(tableWrap).after( "<div class='table-btn-wrap'><div id='table-left'><span class='icon-arrow-left'></span></div><div id='table-right'><span class='icon-arrow-right'></span></div></div>" );
		
		tableWrap.addClass("show-arr");
	}


	function scrollsync(tableWrap, table){
		tableWrap.scroll(function() {
			var tableWrap = tableWrap;
			var table = table;
			hideArrow(tableWrap, table);
		});
	}


	function scrollBtn(){

		$('body').on('click', '#table-left', function(){
			var tableWrap = $(this).closest('.table-btn-wrap').prev(".table-responsive-wrap");
			var table = $(this).closest('.table-btn-wrap').prev(".table-responsive-wrap").find('table');

			var wrapleft = tableWrap.scrollLeft();
			var tablewidth = table.find('table').width();
			var wrapwidth = tableWrap.width();
			var pos = tableWrap.scrollLeft()-100;
			tableWrap.scrollLeft(pos);

			hideArrow(tableWrap, table);
		});

		$('body').on('click', '#table-right', function(){
			var tableWrap = $(this).closest('.table-btn-wrap').prev(".table-responsive-wrap");
			var table = $(this).closest('.table-btn-wrap').prev(".table-responsive-wrap").find('table');

			var wrapleft = tableWrap.scrollLeft();
			var tablewidth = table.width();
			var wrapwidth = tableWrap.width();
			var pos = tableWrap.scrollLeft()+100;
			tableWrap.scrollLeft(pos);

			hideArrow(tableWrap, table);
		});
	}

	function hideArrow(tableWrap, table){
		var wrapleft = $(tableWrap).scrollLeft();
		var tablewidth = $(table).width();	
		var wrapwidth = $(tableWrap).width();

		var btnLeft = $(tableWrap).next('.table-btn-wrap').children('#table-left');
		var btnRight = $(tableWrap).next('.table-btn-wrap').children('#table-right');

		if((wrapleft === 0) && ((tablewidth - wrapwidth) === 0)){
			$(btnLeft).hide();
			$(btnRight).hide();
			$(tableWrap).removeClass("show-arr");
		}
		else if((wrapleft === 0) && ((tablewidth - wrapwidth) > 0)){	
			$(btnRight).show();
			$(btnLeft).hide();
			$(tableWrap).addClass("show-arr");	
		}
		else if(wrapleft === (tablewidth - wrapwidth)){
			$(btnLeft).show();
			$(btnRight).hide();
			$(tableWrap).addClass("show-arr");
		}
		else{
			$(btnLeft).show();
			$(btnRight).show();
			$(tableWrap).addClass("show-arr");
		}
	}
})();
