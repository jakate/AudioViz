/* global AudioVisualizer*/

(function() {

  var songForm = document.getElementById("songForm");
  songForm.addEventListener('submit', function(e) {
    e.preventDefault();

    var song = e.target.elements.song.value;
    var style = '3d'; //e.target.elements.viztype.value;

    songForm.style.display = "none";

    var av = new AudioVisualizer();
    av.init(song, style);

  }, false);

}());
