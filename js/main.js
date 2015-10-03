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

  function startVisualization(){
    av.init();
    formHolder.style.display = "none";
  }

  micForm.addEventListener('submit', function(e) {
    e.preventDefault();
    startVisualization();
    av.initMic();
  });

  songForm.addEventListener('submit', function(e) {
    e.preventDefault();
    var song = e.target.elements.song.value;

    startVisualization();
    av.initLoadSong(song);
  }, false);

}());
