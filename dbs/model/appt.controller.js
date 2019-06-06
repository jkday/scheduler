const Appt = require('./appt.model.js');
//const querystring = require('querystring');
const url = require('url');

//Create new Appointment
exports.create = function(req, res) {

    console.log("INSIDE POST")
        //console.log(req)
    console.log("PARMS: ", req.params);
    console.log("BODY: ", req.body);


    // Request validation
    if (!req.body) {

        return res.status(400).json({
            message: "Appointment content is empty"
        });
    }
    if (!req.body.apptID || !req.body.date) {

        return res.status(400).json({
            message: "Appointment id cannot be made from current user input"
        });
    }


    var myDate = new Date(req.body.date).toISOString();
    // Create a new Appt
    const myAppt = new Appt({
        username: "testUser",
        title: req.body.title || "Appointment heading",
        password: req.body.password || "pass",
        apptID: req.body.apptID,
        date: myDate,
        tod: req.body.tod,
        customerName: req.body.cName || "Test user",
        estimatePrice: req.body.estimatePrice || 0,
        description: req.body.description || "N/A",
    });

    Appt.findOne({ apptID: req.body.apptID })
        .then(foundAppt => {
            if (foundAppt) {
                return res.status(404).json({
                    message: "Appoinment take is already taken on " + req.body.date + " time: " + req.body.tod
                });
            } else {

                // Save Product in the database
                myAppt.save()
                    .then(data => {
                        res.send(data);
                    }).catch(err => {
                        console.log("Error in of POST1");

                        res.status(500).json({
                            message: err.message || "Error while creating appointment."
                        });
                        console.error("Error:", err.message);
                    });
                console.log("End of POST");
            } //endof else
        }); //endof Appt.findOne.then()

}; //endof Appointment create

// Retrieve all products from the database.
exports.findAll = function(req, res) {
    /*
    console.log("INSIDE GET All: ");

    console.log("PARMS: ", req.params);
    console.log("BODY: ", req.body);
    console.log("qs: ", req.query)
*/
    //db.car.find({ speed: { $gt: 40, $lt: 65 } })
    var startDate = new Date(req.query.startdate).toISOString();
    var endDate = new Date(req.query.enddate).toISOString();

    Appt.find({ 'date': { $gt: startDate, $lt: endDate } })
        .then(myAppts => {
            res.send(myAppts);
        }).catch(err => {
            res.status(500).json({
                message: err.message || "Error while retrieving appointment"
            });
        });
};

// Find a single product with a productId
exports.findOne = function(req, res) {
    console.log("INSIDE FindOne")
    Appt.findOne({ apptID: req.params.apptID })
        .then(myAppt => {
            if (!myAppt) {
                return res.status(404).json({
                    message: "Product not found with id " + req.params.apptID
                });
            }
            res.status(200).send(myAppt);

            /* can't render from a different route!
              res.render('/apptList', {
                            title: 'Appointment Results',
                            apptList: [myAppt]
                        });*/

            /* almost works but can't pass objects via qs
            res.redirect(url.format({
                pathname: "/apptList",
                query: {
                    "title": 'Appointment Results',
                    "apptList": JSON.stringify(myAppt),
                }
            }));
            */
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).json({
                    message: "Appointment not found with id " + req.params.apptID
                });
            }
            return res.status(500).json({
                message: "Something wrong retrieving appointment with id " + req.params.apptID
            });
        });
};

// Update a product
exports.update = (req, res) => {
    /*
    console.log("INSIDE PUT!!!");
    console.log(req.params)
    console.log(req.body)
    */

    var query = {};
    // Request validation
    if (!req.body) {
        return res.status(400).json({
            message: "Appointment information is empty"
        });
    }
    if (!req.body.apptID) {
        return res.status(400).json({
            message: "Appointment ID not found"
        });
    } else {
        req.body.apptID = new String(req.body.apptID).trim();

    }

    // Request validation
    if (!req.params) {
        if (req.body.apptID) {
            query = new String(req.body.apptID).trim();
        } else {
            return res.status(400).json({
                message: "Appointment content is empty"
            });
        }
    } else {
        query = { apptID: new String(req.params.apptID).trim() };

    }

    // Find and update product with the request body
    Appt.findOneAndUpdate(query, req.body, { new: true }) //new: return updated document
        .then(myAppt => {
            if (!myAppt) {
                return res.status(404).json({
                    message: "Product not found with id1 " + req.params.apptID
                });
            }
            res.send(myAppt);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).json({
                    message: "Product not found with id2 " + req.params.apptID
                });
            }
            return res.status(500).json({
                message: "Something wrong updating note with id " + req.params.apptID
            });
        });
};

// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {
    console.log("INSIDE DELETE!!!");
    console.log(req.params)

    var query = {};
    // Request validation
    if (req.params.apptID !== undefined && req.params.apptID !== null) {

        query = { apptID: new String(req.params.apptID).trim() };
    } else { //if delete is called with no params then delete all
        Appt.deleteMany({})
            .then(Result => {
                if (!Result) {
                    return res.status(404).json({
                        message: "Deleting full db unsuccessful  ",
                    });
                }

                console.log(Result)
                res.send(Result);

            }).catch(err => {
                return res.status(500).json({
                    message: "Something wrong deleting full db "
                });


            })
        return;
    }
    console.log("deleting query... ", query);
    Appt.findOneAndDelete(query)
        .then(Result => {
            if (!Result) {
                return res.status(404).json({
                    message: "ID: " + query.apptID + " could not be deleted"
                });
            }
            console.log(Result)
            res.status(202).send(Result);
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).json({
                    message: "Appointment with ID: " + query.apptID + "not deleted"
                });
            }
            return res.status(500).json({
                message: "Could not delete appointment with ID: " + query.apptID
            });
        });
};