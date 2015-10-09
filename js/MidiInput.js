var MidiInput = function() {
  this.init = function(visualizer) {
    this.visualizer = visualizer;

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
    // Note 36 triggers blast
    if (note === 36) {
      this.visualizer.triggerBlast();
    } else if (note === 37) {
      this.visualizer.toggleMode('background');
    } else if (note === 38) {
      this.visualizer.toggleMode('blocks');
    } else if (note === 39) {
      this.visualizer.toggleMode('circle');
    } else if (note === 40) {
      this.visualizer.toggleMode('flower');
    } else if (note === 41) {
      this.visualizer.toggleMode('smoke');
    }
  }

  this.handleControlChange = function(index, value) {
    // First controller defines BPM
    if (index === 1) {
      var minBpm = -500;
      var maxBpm = 500;

      var bpm = Math.round(((value / 127) * (maxBpm - minBpm)) + minBpm);

      this.visualizer.setBpm(bpm);
    }
  }
};
