(function() {
	"use strict";
	$(document).ready(function(){
		galleryOWl();	
	});

	$(window).resize(function() {
		galleryOWl();
	});

	function galleryOWl(){
		var winWidth = $(window).width();
		var owlGallery = $("[id^='trip-gallery-'");
		if(winWidth < 768){
			owlGallery.owlCarousel({
				animateOut: 'fadeOut',
				autoplay: true,
				items:1,
				loop:true,
				dots:false,
				nav:true,
				navText: ['<span class="icon-arrow-left"><span>','<span class="icon-arrow-right"><span>'],
				stagePadding:0
			});
		}
		else{
			owlGallery.addClass('off').trigger('destroy.owl.carousel');
			owlGallery.find('.owl-stage-outer').children(':eq(0)').unwrap();
		}
	}

})();
