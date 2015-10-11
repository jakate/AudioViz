navigator.getUserMedia = (navigator.getUserMedia ||
                          navigator.webkitGetUserMedia ||
                          navigator.mozGetUserMedia ||
                          navigator.msGetUserMedia);

var AudioVisualizer = function(){

  var self = this;
  var audioPlayer = new AudioPlayer();
  var audioLoader = new AudioLoader();
  var buffersize = 256;
  var audioDrawer, data;
  var bpm = 80;
  var autoplay = false;
  var autoplayTimeout;

  var colorSchemes = [
    [0x0000ff, 0xff0099, 0x00ff22, 0xff9900],
    [0x3C75D2, 0x3C91D2, 0x62CCF9, 0x0D429A],
    [0xe51e5b, 0xe51e9c, 0xe5301e, 0xe56d1e],
    [0x00fa1d, 0x52fa00, 0xc2fa00, 0x2abc26]
  ];

  var selectedScheme = 0;

  this.initMic = function(){
    if (navigator.getUserMedia) {
      navigator.getUserMedia({
        audio: true
      },
      function(stream) {
        audioPlayer.micConnected(stream, buffersize);
        self.tick();
      },
      function(err){
        console.log(err);
      });
    } else {
       console.log('getUserMedia not supported on your browser!');
    }
  };

  this.init = function(songName){
    audioDrawer = new AudioDrawer();
    audioDrawer.init(colorSchemes[selectedScheme]);

    var keyboardInput = new KeyboardInput();
    keyboardInput.init(this);

    window.addEventListener('resize', onWindowResize, false);
    function onWindowResize() {
      audioDrawer.resize();
    }
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
    audioDrawer.render(data, bpm);
  };

  this.setRandomColorScheme = function() {
    this.setColorScheme(Math.floor(Math.random() * colorSchemes.length));
  };

  this.setColorScheme = function(colorScheme) {
    selectedScheme = colorScheme;
    audioDrawer.changeColors(colorSchemes[selectedScheme]);
  };

  this.triggerBlast = function() {
    audioDrawer.blast();
  };

  this.setBpm = function(beatsPerMinute) {
    bpm = beatsPerMinute;
    console.log(bpm + ' BPM');
  }
};
