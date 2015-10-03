/* global AudioPlayer, AudioDrawer, AudioLoader, AudioDrawer2d*/

var AudioVisualizer = function(){

  var self = this;
  var audioPlayer = new AudioPlayer();
  var audioLoader = new AudioLoader();
  var buffersize = 512;
  var audioDrawer, data;
  var bpm = 80;

  var modes = {
    background: true,
    blocks: true,
    circle: false,
    flower: false,
    smoke: false
  };

  var colorSchemes = [
    [0x0000ff, 0xff0099, 0x00ff22, 0xff9900],
    [0x3C75D2, 0x3C91D2, 0x62CCF9, 0x0D429A],
    [0xe51e5b, 0xe51e9c, 0xe5301e, 0xe56d1e],
    [0x00fa1d, 0x52fa00, 0xc2fa00, 0x2abc26]
  ];

  var selectedSheme = 0;

  this.initMic = function(){
    if (navigator.getUserMedia) {
       navigator.getUserMedia (
          // constraints - only audio needed for this app
          {
             audio: true
          },

          // Success callback
          function(stream) {
             audioPlayer.micConnected(stream, buffersize);
             self.tick();
          },

          // Error callback
          function(err) {
             console.log('The following gUM error occured: ' + err);
          }
       );
    } else {
       console.log('getUserMedia not supported on your browser!');
    }
  };

  this.init = function(songName){
    audioDrawer = new AudioDrawer();
    audioDrawer.init();
    window.addEventListener("keydown", dealWithKeyboard, false);
  };

  this.initLoadSong = function(songName, style){
    audioLoader.getSong(songName, songLoaded);
  };

  function songLoaded(request){
    audioPlayer.songLoaded(request, buffersize);
    self.tick();
  }

  this.tick = function(){
    requestAnimationFrame(self.tick);
    data = audioPlayer.getData();
    audioDrawer.render(data, bpm, modes, colorSchemes[selectedSheme]);
  };

  var tapTempo = 0;
  var tapTempoTs = 0;
  function dealWithKeyboard(e) {
    switch(e.keyIdentifier) {
      case "U+0054":
        var tmpTime = new Date().getTime();
        tapTempo = tmpTime - tapTempoTs;
        tapTempoTs = tmpTime;
        bpm = Math.round(1 / (tapTempo / 1000) * 60);
        console.log(bpm + ' BPM');
        break;
      case "U+0031":
        modes.background = modes.background === false;
        break;
      case "U+0032":
        modes.blocks = modes.blocks === false;
        break;
      case "U+0033":
        modes.circle = modes.circle === false;
        break;
      case "U+0034":
        modes.flower = modes.flower === false;
        break;
      case "U+0035":
        modes.smoke = modes.smoke === false;
        break;
      case "U+0036":
        audioDrawer.blast();
        break;

      // Colors
      case "U+0041":
        selectedSheme = 0;
        break;
      case "U+0053":
        selectedSheme = 1;
        break;
      case "U+0044":
        selectedSheme = 2;
        break;
      case "U+0046":
        selectedSheme = 3;
        break;
    }
  }

  window.addEventListener( 'resize', onWindowResize, false );
  function onWindowResize() {
    audioDrawer.resize();
  }
};
