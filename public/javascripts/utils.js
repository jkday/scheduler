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
    },
    setTimeSlots: function(selector) {

        if (!selector || typeof(selector) !== 'string') {
            console.error("invalid time slot ID: ", selector);
            alert("invalid time slot ID: " + selector);
            return;
        }
        var tmp = Array(9).fill(9).map((x, y) => x + y);
        var timeArray = [];

        tmp.forEach((elem, ind) => {
            timeArray.push.apply(timeArray, ["00", "30", ].map((x) => "".concat(elem.pad(), x)));
        });
        timeArray.forEach((elem, ind) => {
            var $optList = $("<option>");
            $optList.attr('value', elem);
            elem = elem.replace(/(.*)(\d{2})$/, function(match, p1, p2) {
                let dayTag = " pm";
                let hr = parseInt(p1);
                if (hr < 12) dayTag = " am";
                if (hr > 12) hr -= 12;

                return hr.toString() + ":" + p2 + dayTag;

            });

            timeArray[ind] = elem;
            //console.log(elem)
            $optList.text(elem);
            $(selector).append($optList)

        }); //endof forEach timeArray

        console.log(timeArray);


    }, //endof TimeSlot
    makeApptWin: function(appts) {
        console.log("open window!!")

        if (window.childWin && !window.childWin.closed) {
            window.childWin.close(); //close the appointment list window if it was open previously
        }
        var apptWin = window.open('/apptList', 'apptWin', "height=600,width=600");
        apptWin.aList = appts;
        console.log("inside makeApptWin: ", appts)
        apptWin.location.reload(true);
        window.childWin = apptWin;

    }


});


var apptFn = {
    "add": function(event) {
        //show appt form
        //console.log("gothere")

        $(event.data.show).css("display", "block");

    },



};


Number.prototype.pad = function(size) {
    //pad a number with leading zeros according to a given input variable: size
    var s = String(this);
    while (s.length < (size || 2)) { s = "0" + s; }
    return s;
};