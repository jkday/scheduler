/*
 * Sets the API endpoints for handling appointments in a mongoDB 
 *      called by public/app.js
 */


var express = require('express');
var router = express.Router();

/*
 *API router for handling appointments in a mongoDB 
 */
var apptScheduler = require('../dbs/model/appt.controller.js')

// Retrieve a single Appointment with apptID
router.get('/scheduler(/:apptID)+', apptScheduler.findOne);

/* Retreive all Appointments */
router.get(/^\/scheduler\/\?*.*/, apptScheduler.findAll);

/* Create new Appointment */
router.post("/scheduler", apptScheduler.create);

/* Update Appointment w/ apptID*/
router.put("/scheduler/:apptID", apptScheduler.update);

/* Delete an appointment w/ apptID */
router.delete("/scheduler(/:apptID)?", apptScheduler.delete);

module.exports = router;