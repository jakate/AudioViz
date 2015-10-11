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
    audioDrawer.init();

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

  this.triggerBlast = function() {
    audioDrawer.blast();
  };

  this.setBpm = function(beatsPerMinute) {
    bpm = beatsPerMinute;
    console.log(bpm + ' BPM');
  }
};
