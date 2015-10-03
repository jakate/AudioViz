var AudioLoader = function(){

  var spotifyApi = new SpotifyWebApi();

  this.getSong = function(songName, callback){
    console.log("Load: " + songName);

    spotifyApi.searchTracks(songName, {limit: 1})
    .then(function(results) {
      var previewUrl = results.tracks.items[0].preview_url;
      var request = new XMLHttpRequest();
      request.open('GET', previewUrl, true);
      request.responseType = 'arraybuffer';
      request.onload = function(){
        callback(request);
      };
      request.send();
    });
  };
};
