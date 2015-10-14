var SettingsSingleton = function(){

  var origRadius = (window.innerWidth > window.innerHeight ? window.innerWidth : window.innerHeight) / 4;

  var ranges = {
    speed: [-40, 40],
    radius: [0, 500],
    intensity: [0, 1],
    positionSpread: [0, 500],
    sizeStart: [1, 300],
    sizeEnd: [1, 300],
    velocityY: [-300, 300],
    velocityZ: [0, 1000]
  };

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
    manualRadius: false,
    positionSpread: 0,
    sizeStart: 10,
    sizeEnd: 10,
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
  dat.GUI.toggleHide();

  // Letter 'H' toggles gui
  setTimeout(function(){
    gui.add(settings, 'speed', ranges.speed[0], ranges.speed[1]).step(1).listen();
    gui.add(settings, 'radius', ranges.radius[0], ranges.radius[1]).step(1).listen();
    gui.add(settings, 'intensity', ranges.intensity[0], ranges.intensity[1]).listen();

    gui.add(settings, 'positionSpread', ranges.positionSpread[0], ranges.positionSpread[1]).step(1).listen();
    gui.add(settings, 'sizeStart', ranges.sizeStart[0], ranges.sizeStart[1]).step(1).listen();
    gui.add(settings, 'sizeEnd', ranges.sizeEnd[0], ranges.sizeEnd[1]).step(1).listen();
    gui.add(settings, 'velocityY', ranges.velocityY[0], ranges.velocityY[1]).step(1).listen();
    gui.add(settings, 'velocityZ', ranges.velocityZ[0], ranges.velocityZ[1]).step(1).listen();

  },1000);


  /* Ranges */
  this.getRange = function(key) {
    return ranges[key];
  };

  this.get = function(key) {
    return settings[key];
  };

  this.set = function(key, value){
    settings[key] = value;
  };

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
