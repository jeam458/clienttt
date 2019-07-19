(function() {
  "use strict";
  $(document).ready(function($) {
    var price_slider = $("#price-slider");
    price_slider.slider({ 
        range: true, 
        min: 0, 
        max: 500, 
        values: [ 75, 300 ], 
        slide: function( event, ui ) { 
            $( "#amount-min" ).html( "$" + ui.values[ 0 ]); 
            $( "#amount-max" ).html( "$" + ui.values[ 1 ] ); 
        },
    }); 
    $( "#amount-min").html( "$" + $( "#price-slider" ).slider( "values", 0 ));
    $( "#amount-max").html( "$" + $( "#price-slider" ).slider( "values", 1 )); 
});
})();
