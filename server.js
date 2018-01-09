// SERVER-SIDE JAVASCRIPT

//require express in our app
var express = require('express');
// generate a new express app and call it 'app'
var app = express();

//require body parser
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// serve static files from public folder
app.use(express.static(__dirname + '/public'));

/************
 * DATABASE *
 ************/

//requires models into server.js
let db = require('./models');


/**********
 * ROUTES *
 **********/

/*
 * HTML Endpoints
 */

app.get('/', function homepage (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

/*
 * JSON API Endpoints
 */

app.get('/api', function api_index (req, res){
  res.json({
    message: "Welcome to tunely!",
    documentation_url: "https://github.com/tgaff/tunely/api.md",
    base_url: "http://tunely.herokuapp.com",
    endpoints: [
      {method: "GET", path: "/api", description: "Describes available endpoints"}
    ]
  });
});

//backend routing endpoint corresponds to $.get request from the frontend
app.get('/api/albums', function album_index(req, res){
  //accesses the database (through './models'), uses the Album property to find the contents, fire a callback function to respond with json objects
  db.Album.find({}, function(err, albums){
    res.json(albums);
  });
});

app.post('/api/albums', function createAlbum(req, res){

 var newAlbum = new db.Album({
  artistName : req.body.artistName,
  name : req.body.name,
  releaseDate : req.body.releaseDate,
  genres : (req.body.genres).split(", ")
 });

 newAlbum.save( function(err, album){
  if (err){
    console.log("Album not saved; Error: " + err);
  }
  console.log('saved new album ' + album);
 });

 res.json(newAlbum);

});

/**********
 * SERVER *
 **********/

// listen on port 3000
app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is running on http://localhost:3000/');
});
