(function() {
  var micForm = document.getElementById("micForm");
  var songForm = document.getElementById("songForm");
  var formHolder = document.getElementById("formHolder");
  var av, midiInput

  function startVisualization(){
    av.init();
    //formHolder.style.display = "none";
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

  function init(){
    startVisualization();
    av.initMic();
  }

  var start = function() {
    window.removeEventListener('click', start)

    av = new AudioVisualizer();
    midiInput = new MidiInput();
    midiInput.init();

    init();
  }
  window.addEventListener('click', start)

  //songForm.addEventListener('submit', submitSongForm, false);
  //micForm.addEventListener('submit', submitMicForm, false);

}());
