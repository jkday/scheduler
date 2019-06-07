$(function() {

    /*******main section to initialize buttons and UI features with event handler code*******/

    /*initialize datepicker UI widget*/
    todaysDate = new Date();
    var dateOpts = {
        defaultDate: "+0",
        changeMonth: true,
        numberOfMonths: [1, 2],
        minDate: todaysDate,
        maxDate: "+3m",
        constrainInput: true,
    };
    $(".new_date").datepicker(dateOpts);
    dateOpts['minDate'] = null;
    dateOpts['numberOfMonths'] = 1;
    $(".lookup_date").datepicker(dateOpts);

    /**** set handlers for frontpage submit buttons ****/
    var submitBtns = ["singleSearch", "multiSearch", "deleteAll"];
    var searchHandler = [ssHandler, msHandler, deleteHandler];

    submitBtns.forEach((elem, ind) => {

        var tmp = "." + elem + ">div.button";
        console.log($(tmp));

        $(tmp).on('click', { "elem": elem }, searchHandler[ind]);
        console.log("inside submitBtns", elem, " ", ind);

    });



    $('#new_appt').on('submit', function() {});

    $.makeHideBtn('#form_close', '#add_appt_form', 'click'); //modal for new appointment form

    $.setHandler('#appt_add_btn', 'click', { show: '#add_appt_form' }, apptFn['add']);
    $('#frontpage_appt_datepicker').on('change', function() {
            $('#appt_form_date').val(this.value);
        }) //send selected date value to new appointment form


    /********helper functions to perform event handler operations for UI submit buttons*******/

    /*single search handler*/
    function ssHandler(event) {

        console.log("inside sshandler", event.data.elem)
        var formDivName = "." + event.data.elem
        event.preventDefault(); //stops form from posting as normal

        var fData = getFormInfo(formDivName);

        var url = '/scheduler/' + fData.apptID;
        console.log(url)

        $.ajax({
            url: url,
            type: 'GET',
            data: fData,
            contentType: "text/plain",
            dataType: "json",
            processData: false,
            success: function(response) {
                // alert(response);
                // $('#add_appt_form').css("display", "none");
                console.log("Response: ", response);
                $.makeApptWin([response]);


            },
            error: function(xhr, status, error) {
                console.error("Single Search GET Error: " + status);
                console.error("Single Search GET Error:", error);
                //console.error("POST Error:", xhr.responseText);
                console.error("Single Search GET:", xhr.responseJSON.message);


                alert('Problem locating appointment');
                //alert('HEAD: File not found.');
            }
        });

    }

    /*multiple search handler*/
    function msHandler(event) {

        console.log("inside mshandler", event.data.elem);
        var formDivName = "." + event.data.elem
        event.preventDefault(); //stops form from posting as normal

        var fData = getDateFormInfo(formDivName);
        var url = '/scheduler/';
        console.log(fData)

        var fDataStr = JSON.stringify(fData);
        $.ajax({
            url: url,
            type: 'GET',
            data: fData,
            contentType: "text/plain",
            //contentType: 'application/json',
            //dataType: "json",
            //processData: true,
            success: function(response) {
                // alert(response);
                // $('#add_appt_form').css("display", "none");
                console.log("Response: ", response);
                if (!Array.isArray(response)) {
                    return $.makeApptWin([response]);
                } else {
                    $.makeApptWin(response);
                }


            },
            error: function(xhr, status, error) {
                console.error("Multi Search GET Error: " + status);
                console.error("Multi Search GET Error:", error);
                //console.error("POST Error:", xhr.responseText);
                console.error("Multi Search GET Error:", xhr.responseJSON.message);


                alert('Problem locating appointment');
                //alert('HEAD: File not found.');
            }
        });

    }

    /*DELETE ALL appointments handler*/
    function deleteHandler(event) {

        var uri = '/scheduler';
        $.ajax({
            url: uri,
            type: 'DELETE',
            //data: apptInfo,
            success: function(response) {
                alert('Delete All Appointment Request Sent');
                console.log("Number of appointments deleted: ", response.deletedCount);
            },
            error: function(xhr, status, error) {
                console.error("Delete All Error: " + status);
                console.error("DELETE All Error:", error);
                //console.error("PUT Error:", xhr.responseText);
                console.error("DELETE All Error:", xhr.responseJSON.message);


                alert('Problem deleting appointment check error logs');
            }

        });
    }


    /*helper functions to parse form into objects */
    function getFormInfo(formDiv) {
        var formInputs = $(formDiv).children('[name]');
        //console.log(formInputs)
        var fData = {};
        formInputs.each(function(elem) {
            fData[this.name] = this.value;
            console.log("n: ", this.name, " v: ", this.value)

        });
        //console.log("FDATA", fData);
        //fData.apptID = fData.date + fData.tod + cName;
        fData.cName = fData.firstname + "_" + fData.lastname;

        var dateStr = fData.date.split('/');
        var todHR = fData.tod.slice(0, 2);
        var todMin = fData.tod.slice(2);
        //apptID: 2 digit Mon + 2 digit day + 4 digit year + 2 digit Hr + 2 digit Min
        var apptID = [parseInt(dateStr[0]).pad(), parseInt(dateStr[1]).pad(), dateStr[2], todHR, todMin].join("");
        console.log(apptID);
        fData.apptID = apptID + fData.cName;
        //fData.apptID = apptID
        return fData;
    }

    function getDateFormInfo(formDiv) {
        var formInputs = $(formDiv).children('[name]');
        console.log(formInputs)
            //console.log(formInputs);
        var fData = {};
        formInputs.each(function(elem) {
            fData[this.name] = this.value;
            console.log("n: ", this.name, " v: ", this.value)

        });

        return fData;
    }

}); //endof main section


function getFormInfo(formDiv) {
    var formInputs = $(formDiv).children('[name]');
    //console.log(formInputs)
    var fData = {};
    formInputs.each(function(elem) {
        fData[this.name] = this.value;
        console.log("n: ", this.name, " v: ", this.value)

    });
    //console.log("FDATA", fData);
    //fData.apptID = fData.date + fData.tod + cName;
    fData.cName = fData.firstname + "_" + fData.lastname;

    var dateStr = fData.date.split('/');
    var todHR = fData.tod.slice(0, 2);
    var todMin = fData.tod.slice(2);
    //apptID: 2 digit Mon + 2 digit day + 4 digit year + 2 digit Hr + 2 digit Min
    var apptID = [parseInt(dateStr[0]).pad(), parseInt(dateStr[1]).pad(), dateStr[2], todHR, todMin].join("");
    console.log(apptID);
    fData.apptID = apptID + fData.cName;
    //fData.apptID = apptID
    return fData;
}

function getDateFormInfo(formDiv) {
    var formInputs = $(formDiv).children('[name]');
    console.log(formInputs)
        //console.log(formInputs);
    var fData = {};
    formInputs.each(function(elem) {
        fData[this.name] = this.value;
        console.log("n: ", this.name, " v: ", this.value)

    });

    return fData;
}