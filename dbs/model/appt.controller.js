const Appt = require('./appt.model.js');


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
    if (!req.body.apptId || !req.body.date) {

        return res.status(400).json({
            message: "Appointment id cannot be made from current user input"
        });
    }



    // Create a new Appt
    const myAppt = new Appt({
        username: "testUser",
        title: req.body.title || "Appointment heading",
        password: req.body.password || "pass",
        apptId: req.body.apptId,
        date: req.body.date,
        customerName: req.body.cName || "Test user",
        estimatePrice: req.body.price || 0,
        description: req.body.description || "N/A",
    });

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
}; //endof Appointment create

// Retrieve all products from the database.
exports.findAll = function(req, res) {
    console.log("INSIDE GET: ");

    console.log("PARMS: ", req.params);
    console.log("BODY: ", req.body);

    Appt.find()
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
    Appt.findById(req.params.apptId)
        .then(myAppt => {
            if (!myAppt) {
                return res.status(404).json({
                    message: "Product not found with id " + req.params.apptId
                });
            }
            res.send(myAppt);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).json({
                    message: "Appointment not found with id " + req.params.apptId
                });
            }
            return res.status(500).json({
                message: "Something wrong retrieving appointment with id " + req.params.productId
            });
        });
};

// Update a product
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
        return res.status(400).json({
            message: "Appointment information is empty"
        });
    }

    // Find and update product with the request body
    Appt.findByIdAndUpdate(req.params.ApptId, {
            title: req.body.title || "Appt heading",
            estimatePrice: req.body.price,
            description: req.body.description,
        }, { new: true })
        .then(myAppt => {
            if (!myAppt) {
                return res.status(404).json({
                    message: "Product not found with id " + req.params.ApptId
                });
            }
            res.send(myAppt);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).json({
                    message: "Product not found with id " + req.params.ApptId
                });
            }
            return res.status(500).json({
                message: "Something wrong updating note with id " + req.params.ApptId
            });
        });
};

// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {
    Appt.findByIdAndRemove(req.params.ApptId)
        .then(myAppt => {
            if (!myAppt) {
                return res.status(404).json({
                    message: "Product not found with id " + req.params.productId
                });
            }
            res.json({ message: "Product deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).json({
                    message: "Product not found with id " + req.params.apptId
                });
            }
            return res.status(500).json({
                message: "Could not delete product with id " + req.params.apptId
            });
        });
};