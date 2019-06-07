/***
 * 
 * Modal for collecting user information to make new appointment
 * It is visible by selecting the "Make Appointment" button on the right of the web app
 * Controls the 'POST'/CREATE method of the REST application
 */
$(function() {
    var formtext = `<div style='padding:6px;'>
    <span id='form_close' class='close_parent' style="float:right">✖ &nbsp;&nbsp;</span>

    <h2>New Appt Form</h2> 

    <form id="new_appt" class="appt_submit">
        First name:<br>
        <input type="text" name="firstname" value="Car">
        <br> Last name:<br>
        <input type="text" name="lastname" value="Owner">
        <br> Date:
        <br>
        <input class="new_date" id="appt_form_date" type="text" name="date" value="date">
        <br> Time of Day:
        <br>
        <select id="timeList" name="tod">
        </select>
        <br> Service Type:<br>
        <label>Type list</label>
        <select id="myList" name="myList">
          <option value = "1">one</option>
          <option value = "2">two</option>
          <option value = "3">three</option>
          <option value = "4">Other</option>
        </select>
        <br> Description of Problem/ Other feedback<br>
        <textarea rows='6' style='width:200px' name="summary" value=""></textarea>

        <br>
        <br>
        <input class='appt_submit' type="submit" value="Submit">
    </form>


</div>`;
    $('#add_appt_form').append(formtext);
    var $apptDate = $("#appt_form_date");
    todaysDate = new Date();

    $apptDate.datepicker({
        defaultDate: "+0",
        changeMonth: true,
        numberOfMonths: [1, 2],
        minDate: todaysDate,
        maxDate: "+3m",
    });
    $apptDate.on('change', function() {
        $('#frontpage_appt_datepicker').val(this.value); //set the DOM elem value of inital Date text to appt form date
    });

    $.setTimeSlots('#timeList');

    //$('#new_appt').children("input[type='submit']").on('click', function(event) {
    $('#new_appt').on('submit', function(event) {
        event.preventDefault(); //stops form from posting as normal

        var formInputs = $('#new_appt').children('[name]');
        //console.log(formInputs);
        var fData = {};
        formInputs.each(function(elem) {
            fData[this.name] = this.value;

        });
        //console.log("FDATA", fData);
        //fData.apptID = fData.date + fData.tod + cName;
        fData.cName = fData.firstname + "_" + fData.lastname;

        var dateStr = fData.date.split('/');
        var todHR = fData.tod.slice(0, 2);
        var todMin = fData.tod.slice(2);
        //apptID: 2 digit Mon + 2 digit day + 4 digit year + 2 digit Hr + 2 digit Min + customer name (no spaces)
        var apptID = [parseInt(dateStr[0]).pad(), parseInt(dateStr[1]).pad(), dateStr[2], todHR, todMin].join("");
        console.log(apptID);
        fData.apptID = apptID + fData.cName;
        //fData.apptID = apptID


        //return;
        console.log(fData)


        $.ajax({
            url: '/scheduler',
            type: 'POST',
            data: fData,
            success: function(response) {
                alert('Appointment Request Sent');
                $('#add_appt_form').css("display", "none");
                console.log("Response: ", response);
            },
            error: function(xhr, status, error) {
                console.error("Appt Creation Error: " + status);
                console.error("POST Error:", error);
                //console.error("POST Error:", xhr.responseText);
                console.error("POST Error:", xhr.responseJSON.message);


                alert('Problem making new appointment check error logs');
                //alert('HEAD: File not found.');
            }
        });



    });
    //get all the input values
    //make ajax call




});