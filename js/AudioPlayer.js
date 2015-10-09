var AudioPlayer = function(){

  window.AudioContext = window.AudioContext || window.webkitAudioContext;
  var context = new window.AudioContext();
  var analyser = context.createAnalyser();
  var gainNode = context.createGain();
  var audioSource, bufferLength, dataArray, gainNode;

  this.stop = function(){
    audioSource.stop();
  };

  this.getData = function(){
    analyser.getByteFrequencyData(dataArray);
    return {
      spectrum: dataArray,
      song: audioSource,
      volume: getVolume(dataArray)
    };
  };

  this.init = function(buffersize){
    //analyser.minDecibels = -90;
    //analyser.maxDecibels = 0;
    //analyser.smoothingTimeConstant = 0.75;

    analyser.fftSize = buffersize;
    bufferLength = analyser.frequencyBinCount;
    dataArray = new Uint8Array(bufferLength);
  };

  this.micConnected = function(stream, buffersize){
    audioSource = context.createMediaStreamSource(stream);
    this.init(buffersize);
    audioSource.connect(analyser);
  };

  this.setVolume = function(vol){
    gainNode.gain.value = vol;
  };

  this.songLoaded = function(request, buffersize){
    this.init(buffersize);

    context.decodeAudioData(request.response, function(buffer) {
      playSound(buffer);
    }, function(e){
      console.log("Error loading song");
      console.log(e);
    });
  };

  function playSound(buffer) {
    audioSource = context.createBufferSource();
    audioSource.buffer = buffer;
    audioSource.connect(gainNode);
    gainNode.connect(context.destination);
    gainNode.connect(analyser);
    audioSource.start(0);
  }

  function getVolume(array) {
    var values = 0;
    var length = array.length;
    var max = length * 255;

    for (var i = 0; i < length; i++) {
      values += array[i];
    }

    return values / max;
  }
};
