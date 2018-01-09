//imports all the dependencies for building schemas and models
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var Song = require('./song');

//creates album Schema
var AlbumSchema = new Schema({
	artistName : String,
	name : String,
	releaseDate : String,
	genres : [String],
	songs : [Song]              //tried to reference this schema but it didn't work
});

//binds the Album model to AlbumSchema
var Album = mongoose.model('Album', AlbumSchema);

module.exports = Album;


