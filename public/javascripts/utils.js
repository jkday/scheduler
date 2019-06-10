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
        var apptWin = window.open('/apptList', 'apptWin2', "height=600,width=600");
        apptWin.aList = appts;
        console.log("inside makeApptWin: ", appts);
        console.log(apptWin)
        apptWin.location.reload(true);
        window.childWin = apptWin;

    },
    randomEntry: function(counter) {

            //console.log("Rand Entry Counter: ", counter)
            if (!window.makeMoreRandomAppts) {
                return; //if makeMoreRandomAppts is false then cancel randomEntry calls
            }

            counter++;
            delay = (Math.random() * 1500 + 500) * 60; //get a random # between  .5 & 2 min
            const wait = min => new Promise(function(resolve, reject) {
                setTimeout(() => { resolve(makeRandAppt()); }, min); //make a random appt between 1-3 min
            });
            wait(delay).then((val) => {
                console.log("finished adding Random Appt", val);
            }).catch((err) => {
                console.error("Rand Post Error: ", err.responseJSON.message);
            });

            if (window.makeMoreRandomAppts) {
                setTimeout($.randomEntry, 10000, counter); //sleep for 10sec before adding a new Entry/Appt
            }

            return; // endof core part of randomEntry

            /***
             * helder functions for randomEntry below...
             */
            function makeRandAppt() {
                startDate = new Date();
                endDate = new Date(startDate);
                endDate.setMonth(startDate.getMonth() + 3);
                newDate = new Date(startDate.getTime() + Math.random() * (endDate.getTime() - startDate.getTime()));
                //console.log(startDate, " ", endDate, " ", newDate);

                var tmp = Array(9).fill(9).map((x, y) => x + y);
                var timeArray = [];

                tmp.forEach((elem, ind) => {
                    timeArray.push.apply(timeArray, ["00", "30", ].map((x) => "".concat(elem.pad(), x)));
                });

                let timeStr = timeArray[Math.floor(Math.random() * (timeArray.length))];
                var ownerName = "Rand_Owner";
                //apptID: 2 digit Mon + 2 digit day + 4 digit year + 2 digit Hr + 2 digit Min + customer name (no spaces)
                var apptID = [(newDate.getMonth() + 1).pad(), newDate.getDate().pad(), newDate.getFullYear().toString(), timeStr, ownerName].join("");
                var dateStr = [(newDate.getMonth() + 1).pad(), newDate.getDate().pad(), newDate.getFullYear().toString()].join('/');


                var fData = {
                    cName: ownerName,
                    apptID: apptID,
                    tod: timeStr,
                    date: dateStr,
                    estimatePrice: 5000
                }

                console.log(fData);
                return $.ajax({
                    url: '/scheduler',
                    type: 'POST',
                    data: fData,

                }).done(function(data, textStatus, jqXHR) {
                    console.log('Appointment Request Sent');
                    $('#add_appt_form').css("display", "none");
                    // console.log("Status: ", textStatus);
                    // console.log(data);
                    //console.log(jqXHR.responseTxt);

                }).fail(function(jqXHR, textStatus, errorThrown) {
                    console.error("Random Appt Post textStatus: ", textStatus);
                    console.error("Random Appt Post Err:", errorThrown);
                    console.error(jqXHR.responseTxt);
                    // alert('Problem making new appointment check error logs');
                    //failures are most caused by duplicate appointments... print error and ignore

                });


            } //endof makeRandAppt


        } //endof randomEntry

});


var apptFn = {
    "add": function(event) {
        //show appt form
        //console.log("gothere")

        $(event.data.show).css("display", "block");

    },
    toggle: function(event) {
        var jqElem = $(event.target);
        var str = jqElem.text();
        jqElem.text(str);
        if (str == "Start") {
            window.makeMoreRandomAppts = true;
            $.randomEntry(0); //restart looping w/ counter reset to 0
            alert("Random Appointments are being loaded (see console output...)")
        } else {
            window.makeMoreRandomAppts = false;

        }
        str = str == "Start" ? "Stop" : "Start";
        jqElem.text(str);


    }



};


Number.prototype.pad = function(size) {
    //pad a number with leading zeros according to a given input variable: size
    var s = String(this);
    while (s.length < (size || 2)) { s = "0" + s; }
    return s;
};