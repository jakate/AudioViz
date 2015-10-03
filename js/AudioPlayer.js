var AudioPlayer = function(){

  window.AudioContext = window.AudioContext || window.webkitAudioContext;
  var context = new window.AudioContext();
  var analyser = context.createAnalyser();
  var audioSource,bufferLength,dataArray;

  this.stop = function(){
    audioSource.stop();
  };

  this.getData = function(){
    analyser.getByteFrequencyData(dataArray);
    var cleanData = _.reject(dataArray, function(item){
      return item === 0 || item === 128;
    });

    return {
      spectrum: cleanData,
      song: audioSource,
      volume: getVolume(cleanData)
    };
  };

  this.songLoaded = function(request, buffersize){
    analyser.fftSize = buffersize;
    bufferLength = analyser.fftSize;
    dataArray = new Uint8Array(bufferLength);
    analyser.getByteTimeDomainData(dataArray);

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
    audioSource.connect(context.destination);
    audioSource.connect(analyser);
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
