$.extend($, {

    makeHideBtn: function(selector, hideable, eventname) {
        var jqSelect = $(selector);
        var jqHideMe = $(hideable);

        //console.log(jqSelect.html())
        jqSelect.on(eventname, function() {
            //let sibDisplay = $(this).next(hideable).css("display")
            jqHideMe.css("display", "none");
        });


    },
    makeToggleBtn: function() {

    },
    setHandler: function(selector, eventname, options, handler) {
        if ($(selector).length !== 0) {
            $(selector).on('click', options, handler);
            //console.log("firing");
        }
    }

});


var apptFn = {
    "add": function(event) {
        //show appt form
        //console.log("gothere")

        $(event.data.show).css("display", "block");

    },



};