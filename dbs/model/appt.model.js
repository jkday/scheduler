/*  Model/Schema for mongoDB
 *
 *
 */

var bcrypt = require("bcryptjs");
var mongoose = require("mongoose");
var SALT_FACTOR = 10;
var apptSchema = mongoose.Schema({
    //username: { type: String, required: true, unique: true },
    username: { type: String, required: true },
    //password: { type: String, required: true },
    //createdAt: { type: Date, default: Date.now },
    title: String,
    apptID: { type: String, required: true, unique: true },
    date: String,
    tod: String, //time of day
    customerName: String, //firstname_lastname
    estimatePrice: Number,
    displayName: String,
    description: String,
}, {
    timestamps: true
});

/*
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

//var connection = mongoose.createConnection('mongodb://localhost:27017/test');

// Make Mongoose use `findOneAndUpdate()` instead of useFindAndModify
mongoose.set('useFindAndModify', false);
var Appt = mongoose.model("Appt", apptSchema);


module.exports = Appt;