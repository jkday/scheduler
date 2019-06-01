$(function() {
    var formtext = `<div style='padding:6px;'>
    <span id='form_close' class='close_parent' style="float:right">✖ &nbsp;&nbsp;</span>

    <h2>New Appt Form</h2> 

    <form id="new_appt" class="appt_submit">
        First name:<br>
        <input type="text" name="firstname" value="Jay">
        <br> Last name:<br>
        <input type="text" name="lastname" value="Day">
        <br> Date:
        <br>
        <input type="text" name="date" value="date">
        <br> Time of Day:
        <br>
        <input type="text" name="tod" value="time">
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
    //$('#new_appt').children("input[type='submit']").on('click', function(event) {
    $('#new_appt').on('submit', function(event) {
        event.preventDefault(); //stops form from posting as normal

        //console.log("gothere");
        var formInputs = $('#new_appt').children('[name]');
        //console.log(formInputs);
        var fData = {};
        formInputs.each(function(elem) {
            fData[this.name] = this.value;

        });
        //console.log("FDATA", fData);
        cName = "Jimmy";
        fData.apptId = fData.date + fData.tod + cName;
        fData.cName = cName;

        $.ajax({
            url: '/scheduler',
            type: 'POST',
            data: fData,
            success: function(msg) {
                alert('Appointment Request Sent');
                $('#add_appt_form').css("display", "none");
            }
        });

        

    });
    //get all the input values
    //make ajax call




});