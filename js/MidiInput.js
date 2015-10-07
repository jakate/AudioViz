var MidiInput = function() {
  this.init = function(visualizer) {
    this.visualizer = visualizer;

    if (navigator.requestMIDIAccess) {
        navigator.requestMIDIAccess().then(onMidiSuccess, onMidiReject);
    } else {
      console.log('No MIDI support: navigator.requestMIDIAccess is not defined');
    }
  };

  function onMidiReject(err) {
    console.log('MIDI init error: ' + err);
  }

  function onMidiSuccess(midi) {
    console.log('MIDI init ok!');
  }
};
