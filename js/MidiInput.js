var MidiInput = function() {
  this.init = function() {
    if (navigator.requestMIDIAccess) {
        navigator.requestMIDIAccess().then(onMidiSuccess.bind(this), onMidiReject);
    } else {
      console.log('No MIDI support: navigator.requestMIDIAccess is not defined');
    }
  };

  function onMidiReject(err) {
    console.log('MIDI init error: ' + err);
  }

  function onMidiSuccess(midi) {
    if (midi.inputs.size > 0) {
      // Get first MIDI device
      var input = midi.inputs.values().next().value;
      console.log('MIDI device found: ' + input.name);

      // Set MIDI message handler
      input.onmidimessage = messageHandler.bind(this);
    } else {
      console.log('No MIDI input devices available');
    }
  }

  function messageHandler(event) {
    var message = {
      status: event.data[0] & 0xf0,
      data: [
        event.data[1],
        event.data[2]
      ]
    };

    // Note on event
    if (message.status === 144) {
      this.handleNoteOn(message.data[0], message.data[1]);

    // Control change event
    } else if (message.status === 176) {
      this.handleControlChange(message.data[0], message.data[1]);
    }
  }

  this.handleNoteOn = function(note, velocity) {
    if(note === 36) {
      Settings.modeSet('background', Settings.modeGet('background') === false);
    } else if(note === 37) {
      Settings.modeSet('blocks', Settings.modeGet('blocks') === false);
    } else if(note === 38) {
      Settings.modeSet('circle', Settings.modeGet('circle') === false);
    } else if(note === 39) {
      JEvents.dispatchEvent('SMOKE', {color:'black'});
    } else if(note === 40) {
      JEvents.dispatchEvent('SMOKE', {color:'white'});
    } else if(note === 41) {
      JEvents.dispatchEvent('BLAST');
    } else if(note === 42) {
      Settings.set('manualRadius', Settings.get('manualRadius') === false);
    } else if(note === 43) {
      Settings.setNextColorScheme();
    }
  }

  this.handleControlChange = function(index, val) {
    var value = val / 127;
    var key = null;

    switch(index) {
      case 1 :
        key = 'speed';
        break;
      case 2 :
        key = 'radius';
        break;
      case 3 :
        key = 'intensity';
        break;
      case 4 :
        key = 'positionSpread';
        break;
      case 5 :
        key = 'sizeStart';
        break;
      case 6 :
        key = 'sizeEnd';
        break;
      case 7 :
        key = 'velocityY';
        break;
      case 8 :
        key = 'velocityZ';
        break;
    }

    if(key) {
      var range = Settings.getRange(key);
      value = (value * (range[1] - range[0])) - range[0];
      Settings.set(key, value);
    }

    // First controller defines BPM
    /*if (index === 1) {
      var minBpm = -500;
      var maxBpm = 500;
      var bpm = Math.round(((value / 127) * (maxBpm - minBpm)) + minBpm);

      //this.visualizer.setBpm(bpm);
    }*/
  }
};
