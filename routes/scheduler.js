var express = require('express');
var router = express.Router();

var apptScheduler = require('../dbs/model/appt.controller.js')

/* Retreive all Appointments */
router.get("/scheduler", apptScheduler.findAll);

// Retrieve a single Appointment with apptId
router.get('/scheduler/:apptId', apptScheduler.findOne);

/* Create new Appointment */
router.post("/scheduler", apptScheduler.create);

/* Update Appointment w/ apptId*/
router.put("/scheduler/:apptId", apptScheduler.update);

/* Delete an appointment w/ apptId */
router.post("/scheduler", apptScheduler.create);

module.exports = router;