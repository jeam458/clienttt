(function() {
	"use strict";

	$(document).ready(function($) {
		var waypoint_1 = $('.wp-1');
		waypoint_1.waypoint(function() {
			waypoint_1.addClass('animated flipInX');
		}, {
			offset: '75%'
		});

		var waypoint_2 = $('.wp-2');
		waypoint_2.waypoint(function() {
			waypoint_2.addClass('animated flipInX');
		}, {
			offset: '75%'
		});
	});

})();