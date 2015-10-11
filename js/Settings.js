var SettingsSingleton = function(){

  var origRadius = (window.innerWidth > window.innerHeight ? window.innerWidth : window.innerHeight) / 4;

  var modes = {
    background: true,
    blocks: false,
    circle: true,
    flower: false,
    smoke: false
  };

  var settings = {
    origRadius: origRadius,
    intensity: 1,
    speed: 10,
    radius: origRadius,
    manualRadius: false
  };

  var emitterSettings = {
    positionSpread: 1,
    sizeStart: 20,
    sizeEnd: 70,
    //velocityX: 0,
    velocityY: 0,
    velocityZ: 0
  };

  var colorSchemes = [
    [0x0000ff, 0xff0099, 0x00ff22, 0xff9900],
    [0x3C75D2, 0x3C91D2, 0x62CCF9, 0x0D429A],
    [0xe51e5b, 0xe51e9c, 0xe5301e, 0xe56d1e],
    [0x00fa1d, 0x52fa00, 0xc2fa00, 0x2abc26]
  ];

  var selectedScheme = 0;

  var gui = new dat.GUI();
  gui.add(settings, 'speed', -40, 40).step(1).listen();
  gui.add(settings, 'radius', 0, 500).step(1).listen();
  gui.add(settings, 'intensity', 0, 1).listen();

  gui.add(emitterSettings, 'positionSpread', 0, 500).step(1).listen();
  gui.add(emitterSettings, 'sizeStart', 1, 300).step(1).listen();
  gui.add(emitterSettings, 'sizeEnd', 1, 300).step(1).listen();
  //gui.add(emitterSettings, 'velocityX', -300, 300).step(1).listen();
  gui.add(emitterSettings, 'velocityY', -300, 300).step(1).listen();
  gui.add(emitterSettings, 'velocityZ', 0, 500).step(1).listen();

  /* Partice settings */
  this.get = function(key) {
    return settings[key];
  };

  this.set = function(key, value){
    settings[key] = value;
  };

  /* Emitter settings */
  this.emitterSet = function(key, value){
    emitterSettings[key] = value;
  }

  this.emitterGet = function(key){
    return emitterSettings[key];
  }

  this.getEmitterSettings = function(){
    return emitterSettings;
  }

  /* Modes */
  this.modeGet = function(key) {
    return modes[key];
  }

  this.getModes = function() {
    return modes;
  };

  this.modeSet = function(key, value){
    console.log('set mode ' + key + ' ' + value);
    modes[key] = value;
  };

  /* Colors */
  this.setColorScheme = function(num) {
    selectedScheme = num;
    return this.getCurrentColors();
  };

  this.setRandomColorScheme = function() {
    selectedScheme = Math.floor(Math.random() * colorSchemes.length);
    return this.getCurrentColors();
  };

  this.setNextColorScheme = function() {
    selectedScheme = selectedScheme === colorSchemes.length-1 ? 0 : selectedScheme + 1;
    return this.getCurrentColors();
  };

  this.getCurrentColors = function(){
    return colorSchemes[selectedScheme];
  };

}

var Settings = new SettingsSingleton();
