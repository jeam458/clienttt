(function() {
	"use strict";
	
	// Dialog Simple
	$('#btn-dialog-simple').click(function () {
		$('#modal-simple').dialog('open');
		return false;
	});
	
	$('#modal-simple').dialog({
		autoOpen: false,
		width: 600,
		buttons: {
			"Ok": function () {
				$(this).dialog("close");
			},
			"Cancel": function () {
				$(this).dialog("close");
			}
		}
	});

    // Tabs
    $('#tabs').tabs();


    // Datepicker
    $('#datepicker').datepicker({
    	inline: true
    });

    //Slider
    // Horizontal slider
    $('#h-slider').slider({
    	range: true,
    	values: [17, 67]
    });

    // Vertical slider
    $("#v-slider").slider({
    	orientation: "vertical",
    	range: "min",
    	min: 0,
    	max: 100,
    	value: 60,
    	slide: function (event, ui) {
    		$("#amount").val(ui.value);
    	}
    });
    $("#amount").val($("#v-slider").slider("value"));

    // Autocomplete
    var availableTags = ["ActionScript", "AppleScript", "Asp", "BASIC", "C", "C++", "Clojure", "COBOL", "ColdFusion", "Erlang", "Fortran", "Groovy", "Haskell", "Java", "JavaScript", "Lisp", "Perl", "PHP", "Python", "Ruby", "Scala", "Scheme"];

    $("#tags").autocomplete({
    	source: availableTags
    });

})();