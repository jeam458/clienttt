(function() {
  "use strict";
  var effect = [
  "bounce",
  "flash",
  "pulse",
  "rubberBand",
  "shake",
  "headShake",
  "swing",
  "tada",
  "wobble",
  "jello",
  "bounceIn",
  "bounceInDown",
  "bounceInLeft",
  "bounceInRight",
  "bounceInUp",
  "fadeIn",
  "fadeInDown",
  "fadeInDownBig",
  "fadeInLeft",
  "fadeInLeftBig",
  "fadeInRight",
  "fadeInRightBig",
  "fadeInUp",
  "fadeInUpBig",
  "flipInX",
  "flipInY",
  "lightSpeedIn",
  "rotateIn",
  "rotateInDownLeft",
  "rotateInDownRight",
  "rotateInUpLeft",
  "rotateInUpRight",
  "rollIn",
  "zoomIn",
  "zoomInDown",
  "zoomInLeft",
  "zoomInRight",
  "zoomInUp",
  "slideInDown",
  "slideInLeft",
  "slideInRight",
  "slideInUp"
  ];

  $(document).ready(function($) {
   var html = ""; 
   for (var i = 0; i < effect.length; i++) {
    $('.effect-list').append('<div class="col-sm-6 animated wp-' + i + '"><div class="feature-box"><span class="chat-icon"><span class="icon-hand-rock"></span></span><div class="desc"><h5>' + effect[i] + '</h5><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Odit fugit at facere, voluptatem accusamus similique autem magnam assumenda</p></div></div></div>');
    wayfunction(i);
  }
});
  $(window).scroll(function () {
   for (var i = 0; i < effect.length; i++) {
     /*waypoint on about us*/
     effectfunction(i);
   }
 });

  function wayfunction(i) {
    $('.wp-'+i).waypoint(function() {
      $('.wp-'+i).addClass(effect[i]);
    }, {
      offset: '85%'
    });
  }

  function effectfunction(i) {
    $('.wp-'+i).waypoint(function() {
      $('.wp-'+i).addClass(effect[i]);
    }, {
      offset: '85%'
    });
  }


})();