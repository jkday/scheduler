/* 
 *  Model/Schema for mongoDB 
 *      used by dbs/model/appt.controller.js
 */

var bcrypt = require("bcryptjs");
var mongoose = require("mongoose");
var SALT_FACTOR = 10;
var apptSchema = mongoose.Schema({
    username: { type: String, required: true },
    //password: { type: String, required: true },
    title: String,
    apptID: { type: String, required: true, unique: true },
    date: String,
    tod: String, //time of day
    customerName: String, //firstname_lastname
    estimatePrice: Number,
    displayName: String,
    description: String,
}, {
    timestamps: true //will add createdAt and updatedAt keys to our Model
});

/* encryption code... add later 
var noop = function() {};
apptSchema.pre("save", function(done) {
    console.log("in PRE state")
    var user = this;
    if (!user.isModified("password")) {
        return done();
    }
    bcrypt.genSalt(SALT_FACTOR, function(err, salt) {
        if (err) { return done(err); }
        bcrypt.hash(user.password, salt, noop, function(err, hashedPassword) {
            if (err) { return done(err); }
            user.password = hashedPassword;
            done();
        });
    });
});

apptSchema.methods.checkPassword = function(guess, done) {
    bcrypt.compare(guess, this.password, function(err, isMatch) {
        done(err, isMatch);
    });
};

apptSchema.methods.name = function() {
    return this.displayName || this.username;
};
*/

// Make Mongoose use `findOneAndUpdate()` instead of useFindAndModify
mongoose.set('useFindAndModify', false);
var Appt = mongoose.model("Appt", apptSchema);


module.exports = Appt;