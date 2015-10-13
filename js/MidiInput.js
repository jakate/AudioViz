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
      //Settings.modeSet('background', Settings.modeGet('background') === false);
    } else if(note === 37) {
      Settings.modeSet('blocks', Settings.modeGet('blocks') === false);
    } else if(note === 38) {
      Settings.modeSet('circle', Settings.modeGet('circle') === false);
    } else if(note === 39) {
      //Settings.modeSet('xx5', Settings.modeGet('xx5') === false);
    } else if(note === 40) {
      Settings.modeSet('smoke', Settings.modeGet('smoke') === false);
    } else if(note === 41) {
      //Settings.modeSet('xx6', Settings.modeGet('xx6') === false);
    } else if(note === 42) {
      Settings.set('manualRadius', Settings.get('manualRadius') === false);
    } else if(note === 43) {
      Settings.setNextColorScheme();
    }
  }

  this.handleControlChange = function(index, val) {
    var value = val / 127;
    if(index === 1) {
      value = Math.round((value - 0.5) * 40 * 2);
      Settings.set('speed', value);
    }
    else if(index === 2) {
      value = Math.round(value * 500);
      Settings.set('radius', value);
    }
    else if(index === 3) {
      Settings.set('intensity', value);
    }
    else if(index === 4) {
      value = Math.round(value * 500);
      Settings.emitterSet('positionSpread', value);
    }
    else if(index === 5) {
      value = Math.round(value * 299) + 1;
      Settings.emitterSet('sizeStart', value);
    }
    else if(index === 6) {
      value = Math.round(value * 299) + 1;
      Settings.emitterSet('sizeEnd', value);
    }
    else if(index === 7) {
      //Settings.emitterSet('velocityX', (value - 0.5) * 300 * 2);
      value = Math.round((value - 0.5) * 300 * 2);
      Settings.emitterSet('velocityY', value);
    }
    else if(index === 8) {
      value = Math.round(value * 500);
      Settings.emitterSet('velocityZ', value);
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
