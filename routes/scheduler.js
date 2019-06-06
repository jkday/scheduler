var express = require('express');
var router = express.Router();

var apptScheduler = require('../dbs/model/appt.controller.js')

/* Retreive all Appointments */
router.get("/scheduler?*", apptScheduler.findAll);

// Retrieve a single Appointment with apptID
router.get('/scheduler/:apptID', apptScheduler.findOne);

/* Create new Appointment */
router.post("/scheduler", apptScheduler.create);

/* Update Appointment w/ apptID*/
router.put("/scheduler/:apptID", apptScheduler.update);

/* Delete an appointment w/ apptID */
router.delete("/scheduler(/:apptID)?", apptScheduler.delete);

module.exports = router;