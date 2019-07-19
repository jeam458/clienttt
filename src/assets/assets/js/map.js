(function() {
	"use strict";
	
    function initialize() {
        var mapOptions = {
            scrollwheel: false,
            zoom: 8,
            center: new google.maps.LatLng(46.021, 21.388)
        };

        var map = new google.maps.Map(document.getElementById('map-canvas'),
            mapOptions);

        var image = 'assets/img/mapmarker.png';
        var myLatLng = new google.maps.LatLng(46.021, 21.388);
        var marker = new google.maps.Marker({
            position: myLatLng,
            map: map,
            icon: image
        });

        var contentString = '<div style="text-align: center">'+
        '<h1>Bootstrap Template</h1>'+
        '<p><b>by Mold Discover</b></p>'+
        '</div>';

        var infowindow = new google.maps.InfoWindow({
            content: contentString
        });
        google.maps.event.addListener(marker, 'click', function() {
            infowindow.open(map,marker);
        });
    }

    google.maps.event.addDomListener(window, 'load', initialize);

})();