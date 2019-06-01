$(function() {

    $.makeHideBtn('#form_close', '#add_appt_form', 'click');

    $.setHandler('#appt_add_btn', 'click', { show: '#add_appt_form' }, apptFn['add']);



});