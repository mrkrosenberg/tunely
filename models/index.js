//requires mongoose
var mongoose = require("mongoose");
//connects to mongo database and creates a database called tunely
mongoose.connect("mongodb://localhost/tunely");


//requires and exports Album
module.exports.Album = require('./album');
