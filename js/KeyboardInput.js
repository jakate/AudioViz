var KeyboardInput = function() {
  var tapTempo = 0;
  var tapTempoTs = 0;

  this.init = function(visualizer) {
    this.visualizer = visualizer;

    window.addEventListener('keydown', dealWithKeyboard.bind(this), false);
  }

  function dealWithKeyboard(e) {
    var key = String.fromCharCode(e.keyCode);

    switch(key) {
      // Number 0
      case '0':
        this.visualizer.toggleAutoPlay();
        break;
      // Number 1
      case '1':
        var tmpTime = new Date().getTime();
        tapTempo = tmpTime - tapTempoTs;
        tapTempoTs = tmpTime;
        var bpm = Math.round(1 / (tapTempo / 1000) * 60);

        this.visualizer.setBpm(bpm);
        break;
      // Number 2
      case '2':
        this.visualizer.toggleMode('background');
        break;
      // Number 3
      case '3':
        this.visualizer.toggleMode('blocks');
        break;
      // Number 4
      case '4':
        this.visualizer.toggleMode('circle');
        break;
      // Number 5
      case '5':
        this.visualizer.toggleMode('flower');
        break;
      // Number 6
      case '6':
        this.visualizer.toggleMode('smoke');
        break;
      // Number 7
      case '7':
        this.visualizer.triggerBlast();
        break;

      // --- Colors ---
      // A key
      case 'A':
        this.visualizer.setColorScheme(0);
        break;
      // S key
      case 'S':
        this.visualizer.setColorScheme(1);
        break;
      // D key
      case 'D':
        this.visualizer.setColorScheme(2);
        break;
      // F key
      case 'F':
        this.visualizer.setColorScheme(3);
        break;
    }
  }
};
