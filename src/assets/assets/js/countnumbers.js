(function() {
  "use strict";

  $(document).ready(function(){
    var countThis = $('.counter');
    countThis.countUp({
        delay: 30,
        time: 3000
    });
});

  $.fn.countUp = function( options ) {

    // Defaults
    var settings = $.extend({
        'time': 400,
        'delay': 10
    }, options);

    return this.each(function(){

        // Store the object
        var $this = $(this);
        var $settings = settings;

        var countUpper = function() {
            var nums = [];
            var divisions = $settings.time / $settings.delay;
            var num = $this.text();
            var isComma = /[0-9]+,[0-9]+/.test(num);
            num = num.replace(/,/g, '');
            var isInt = /^[0-9]+$/.test(num);
            var isFloat = /^[0-9]+\.[0-9]+$/.test(num);
            var decimalPlaces = isFloat ? (num.split('.')[1] || []).length : 0;

            // Generate list of incremental numbers to display
            for (var i = divisions; i >= 1; i--) {

                // Preserve as int if input was int
                var newNum = parseInt(num / divisions * i);

                // Preserve float if input was float
                if (isFloat) {
                    newNum = parseFloat(num / divisions * i).toFixed(decimalPlaces);
                }

                // Preserve commas if input had commas
                if (isComma) {
                    while (/(\d+)(\d{3})/.test(newNum.toString())) {
                        newNum = newNum.toString().replace(/(\d+)(\d{3})/, '$1'+','+'$2');
                    }
                }

                nums.unshift(newNum);
            }

            $this.data('countup-nums', nums);
            $this.text('0');

            // Updates the number until we're done
            var f = function() {
                $this.text($this.data('countup-nums').shift());
                if ($this.data('countup-nums').length) {
                    setTimeout($this.data('countup-func'), $settings.delay);
                } else {
                    //delete $this.data('countup-nums');
                    $this.data('countup-nums', null);
                    $this.data('countup-func', null);
                }
            };
            $this.data('countup-func', f);

            // Start the count up
            setTimeout($this.data('countup-func'), $settings.delay);
            this.destroy();
        };


        var waypoints = $this.waypoint(countUpper, { offset: '100%' });
    });
};
})();
