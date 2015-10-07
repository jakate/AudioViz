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
    var data = {
      status: event.data[0] & 0xf0,
      data: [
        event.data[1],
        event.data[2]
      ]
    };

    handleInput(data);
  }

  function handleInput(data) {
    // Note on event
    if (data.status === 144) {
      var note = data.data[0];
      var velocity = data.data[1];
      console.log('Note on: ' + note + ', ' + velocity);

    // Control change event
    } else if (data.status === 176) {
      var index = data.data[0];
      var value = data.data[1];
      console.log('Control change: ' + index + ', ' + value);
    }
  }
};
