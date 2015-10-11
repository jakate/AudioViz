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

  var settings = {
    intensity: 1
  }

  var autoplay = false;
  var autoplayTimeout;

  var modes = {
    background: true,
    blocks: false,
    circle: true,
    flower: false,
    smoke: false
  };

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
    audioDrawer.init(modes, colorSchemes[selectedScheme]);

    var keyboardInput = new KeyboardInput();
    keyboardInput.init(this);

    var midiInput = new MidiInput();
    midiInput.init(this, audioPlayer);

    window.addEventListener( 'resize', onWindowResize, false );
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
    audioDrawer.render(data, bpm, Settings.getSettings().intensity);
  };

  function autoplaySwitch() {
    for (var key in modes) {
      var rand = Math.random() >= 0.5;
      modes[key] = rand;
    }

    selectedScheme = Math.floor(Math.random()*colorSchemes.length)
    audioDrawer.changeColors(colorSchemes[selectedScheme]);

    audioDrawer.changeMode(modes);

    var delay = 2000 + Math.floor(Math.random() * 10000);
    autoplayTimeout = setTimeout(autoplaySwitch, delay);
  }

  function toggleAutoPlay() {
    if(autoplay === true) {
      clearTimeout(autoplayTimeout)
    }

    autoplay = autoplay === false;

    if(autoplay === true){
      autoplaySwitch()
    }
  }

  this.setRandomColorScheme = function() {
    this.setColorScheme(Math.floor(Math.random() * colorSchemes.length));
  };

  this.setColorScheme = function(colorScheme) {
    selectedScheme = colorScheme;
    audioDrawer.changeColors(colorSchemes[selectedScheme]);
  };

  this.toggleMode = function(mode) {
    modes[mode] = modes[mode] === false;
    audioDrawer.changeMode(modes);
  };

  this.toggleAutoPlay = function() {
    toggleAutoPlay();
  };

  this.triggerBlast = function() {
    audioDrawer.blast();
  };

  this.setIntencity = function(intensity) {
    Settings.getSettings().intensity = intensity;
  };

  this.setBpm = function(beatsPerMinute) {
    bpm = beatsPerMinute;
    console.log(bpm + ' BPM');
  }
};
