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
        // toggleAutoPlay
        break;
      case '1':
        Settings.modeSet('background', Settings.modeGet('background') === false);
        break;
      case '2':
        Settings.modeSet('blocks', Settings.modeGet('blocks') === false);
        break;
      case '3':
        Settings.modeSet('circle', Settings.modeGet('circle') === false);
        break;
      case '4':
        Settings.set('manualRadius', Settings.get('manualRadius') === false);
        break;
      case '5':
        JEvents.dispatchEvent('SMOKE', {color:'black'});
        break;
      case '6':
        JEvents.dispatchEvent('SMOKE', {color:'white'});
        break;
      case '7':
        JEvents.dispatchEvent('BLAST');
        break;

      // --- Tap tempo ---
      case 'T':
        var bpm = getBpm();
        this.visualizer.setBpm(bpm);
        break;

      // --- Colors ---
      case 'A':
      Settings.setColorScheme(0);
        break;
      case 'S':
      Settings.setColorScheme(1);
        break;
      case 'D':
      Settings.setColorScheme(2);
        break;
      case 'F':
      Settings.setColorScheme(3);
        break;
    }
  }
};
