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
      handleNoteOn(message.data[0], message.data[1]);

    // Control change event
    } else if (message.status === 176) {
      handleControlChange(message.data[0], message.data[1]);
    }
  }

  function handleNoteOn(note, velocity) {
    console.log('Note on: ' + note + ', ' + velocity);
  }

  function handleControlChange(index, value) {
    console.log('Control change: ' + index + ', ' + value);
  }
};
