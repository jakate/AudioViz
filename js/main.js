/* global AudioVisualizer*/

navigator.getUserMedia = (navigator.getUserMedia ||
                          navigator.webkitGetUserMedia ||
                          navigator.mozGetUserMedia ||
                          navigator.msGetUserMedia);

(function() {
  var micForm = document.getElementById("micForm");
  var songForm = document.getElementById("songForm");
  var formHolder = document.getElementById("formHolder");
  var av = new AudioVisualizer();
  av.init();

  function hideForms(){
    formHolder.style.display = "none";
  }

  micForm.addEventListener('submit', function(e) {
    e.preventDefault();
    av.initMic();
    hideForms();
  });

  songForm.addEventListener('submit', function(e) {
    e.preventDefault();
    var song = e.target.elements.song.value;

    hideForms();
    av.initLoadSong(song);

  }, false);

}());
