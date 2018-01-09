//requires mongoose in this file
const mongoose = require('mongoose');
//
const Schema = mongoose.Schema;

//create song schema
var SongSchema = new Schema({
	name : String,
	trackNumber : Number
});

//binds all song models to songSchema structure
// var Song = mongoose.model('Song', SongSchema);  //****Why is this syntax different that books app?

//export this schema/model 
module.exports = SongSchema;