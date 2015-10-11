(function() {
  var micForm = document.getElementById("micForm");
  var songForm = document.getElementById("songForm");
  var formHolder = document.getElementById("formHolder");
  var av = new AudioVisualizer();

  var midiInput = new MidiInput();
  midiInput.init();

  function startVisualization(){
    av.init();
    formHolder.style.display = "none";
  }

  function submitSongForm(e) {
    e.preventDefault();
    startVisualization();
    av.initLoadSong(e.target.elements.song.value);
  }

  function submitMicForm(e) {
    e.preventDefault();
    startVisualization();
    av.initMic();
  }

  songForm.addEventListener('submit', submitSongForm, false);
  micForm.addEventListener('submit', submitMicForm, false);

}());
