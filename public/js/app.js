/* CLIENT-SIDE JS
 *
 * You may edit this file as you see fit.  Try to separate different components
 * into functions and objects as needed.
 *
 */


/* hard-coded data! */
var sampleAlbums = [];
sampleAlbums.push({
             artistName: 'Ladyhawke',
             name: 'Ladyhawke',
             releaseDate: '2008, November 18',
             genres: [ 'new wave', 'indie rock', 'synth pop' ]
           });
sampleAlbums.push({
             artistName: 'The Knife',
             name: 'Silent Shout',
             releaseDate: '2006, February 17',
             genres: [ 'synth pop', 'electronica', 'experimental' ]
           });
sampleAlbums.push({
             artistName: 'Juno Reactor',
             name: 'Shango',
             releaseDate: '2000, October 9',
             genres: [ 'electronic', 'goa trance', 'tribal house' ]
           });
sampleAlbums.push({
             artistName: 'Philip Wesley',
             name: 'Dark Night of the Soul',
             releaseDate: '2008, September 12',
             genres: [ 'piano' ]
           });
/* end of hard-coded data */




$(document).ready(function() {
  console.log('app.js loaded!');

  //starting on localhost:3000 and requesting data from /api/albums
  //get request albums from /api/albums; corresponds to the get request in server.js
  $.get('/api/albums', function(albums){
    // console.log('right here now');
    //for each element in albums, run the renderAlbum function
    albums.forEach( function(element){
      renderAlbum(element);
    });
  });

//code for passing each album into the renderAlbum function and rendering it to index.html
  // sampleAlbums.forEach(function(album){
  //   renderAlbum(album);
  // });

  $('#newAlbumForm').on('submit', function(event){
    event.preventDefault();
    
    //serializes the form data and sends form data to the database when the form is submitted
    var formData = $(this).serialize();
    console.log(formData);

    $(this).trigger('reset');

    $.post('/api/albums', formData, function(album){
      console.log(album);
      renderAlbum(album);
    });

  });


});


//Functions

function buildSongsHtml(songs) { 
  var songText = "  – "; 
  songs.forEach(function(song) { 
    songText = songText + "(" + song.trackNumber + ") " + song.name + " – "; });
      console.log(songText);
     var songsHtml = 
"         <li class='list-group-item'>" +
"           <h4 class='inline-header'>Songs:</h4>" +
"             <span>" + songText + "</span>" +
"         </li>"; 
      // $('#albums').append(songsHtml);
     return songsHtml;   //exports the html created by this function

     
}



// this function takes a single album and renders it to the page
function renderAlbum(album) {
  // console.log('rendering album:', album);

  var albumHtml =
  "        <!-- one album -->" +
  "        <div class='row album' data-album-id=" + album._id + ">" +
  "          <div class='col-md-10 col-md-offset-1'>" +
  "              <!-- begin album internal row -->" +
  "                <div class='row'>" +
  "                  <div class='col-md-3 col-xs-12 album-art'>" +
  "                     <img class='img-fluid' src='" + "http://placehold.it/400x400'" +  " alt='album image'>" +
  "                  </div>" +
  "                  <div class='col-md-9 col-xs-12'>" +
  "                    <ul class='list-group'>" +
  "                      <li class='list-group-item'>" +
  "                        <h4 class='inline-header'>Album Name:</h4>" +
  "                        <span class='album-name'>" + album.name + "</span>" +
  "                      </li>" +
  "                      <li class='list-group-item'>" +
  "                        <h4 class='inline-header'>Artist Name:</h4>" +
  "                        <span class='artist-name'>" +  album.artistName+ "</span>" +
  "                      </li>" +
  "                      <li class='list-group-item'>" +
  "                        <h4 class='inline-header'>Released date:</h4>" +
  "                        <span class='album-releaseDate'>" + album.releaseDate + "</span>" +
  "                      </li>" +
  "                       <li class='list-group-item'>" +
  "                        <h4 class='inline-header'>Genre:</h4>" +
  "                        <span class='album-genres'>" + album.genres + "</span>" +
  "                      </li>" + 
                  buildSongsHtml(album.songs); +  ";akjdsfoihadgoiag" +               //concatenates the html from this function to this html
  "                    </ul>" +
  "                 <div class='row panel-footer'>" +
  "                     <button class='btn btn-primary add-song'>Add Song</button>" +
  "                 </div>" +
  "                  </div>" +
  "                </div>" +
  "                <!-- end of album internal row -->" +
  "          </div>" +
  "          <!-- end one album -->";
    
  // render to the page with jQuery
  $('#albums').append(albumHtml);
}
