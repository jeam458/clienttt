(function() {
	"use strict";
	$(document).ready(function(){
		var trip_insight = $(".insight-list-wrap");
		trip_insight.owlCarousel({
			animateOut: 'fadeOut',
			autoplay: true,
			items:4,
			loop:true,
			dots:false,
			stagePadding:0,
			responsiveClass:true,
			responsive:{
				0:{
					items:1
				},
				700:{
					items:4
				}
			}
		});
	});

	// $('.nav-tabs > li > a').on('click', function(e) {
	// 	e.preventDefault();
	// 	$(this).tab('show');
	// });
	$('#trip-tab').tabCollapse();
})();
