var KeyboardInput = function() {
  var tapTempo = 0;
  var tapTempoTs = 0;

  this.init = function(visualizer) {
    this.visualizer = visualizer;

    window.addEventListener('keydown', dealWithKeyboard.bind(this), false);
  }

  function getBpm() {
    var tmpTime = new Date().getTime();
    tapTempo = tmpTime - tapTempoTs;
    tapTempoTs = tmpTime;

    var bpm = Math.round(1 / (tapTempo / 1000) * 60);

    return bpm;
  }

  function dealWithKeyboard(e) {
    var key = String.fromCharCode(e.keyCode);

    switch(key) {
      // --- Effects ---
      case '0':
        this.visualizer.toggleAutoPlay();
        break;
      case '1':
        this.visualizer.toggleMode('background');
        break;
      case '2':
        this.visualizer.toggleMode('blocks');
        break;
      case '3':
        this.visualizer.toggleMode('circle');
        break;
      case '4':
        this.visualizer.toggleMode('flower');
        break;
      case '5':
        this.visualizer.toggleMode('smoke');
        break;
      case '6':
        this.visualizer.triggerBlast();
        break;

      // --- Tap tempo ---
      case 'T':
        var bpm = getBpm();
        this.visualizer.setBpm(bpm);
        break;

      // --- Colors ---
      case 'A':
        this.visualizer.setColorScheme(0);
        break;
      case 'S':
        this.visualizer.setColorScheme(1);
        break;
      case 'D':
        this.visualizer.setColorScheme(2);
        break;
      case 'F':
        this.visualizer.setColorScheme(3);
        break;
    }
  }
};
