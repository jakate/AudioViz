var SettingsSingleton = function(){

  var origRadius = (window.innerWidth > window.innerHeight ? window.innerWidth : window.innerHeight) / 4;

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
    velocityX: 0,
    velocityY: 0,
    velocityZ: 0
  }

  var gui = new dat.GUI();
  gui.add(settings, 'speed', -40, 40).step(1);
  gui.add(settings, 'radius', 0, 500).step(1);
  gui.add(settings, 'intensity', 0, 1);

  gui.add(emitterSettings, 'positionSpread', 0, 500).step(1);
  gui.add(emitterSettings, 'sizeStart', 1, 300).step(1);
  gui.add(emitterSettings, 'sizeEnd', 1, 300).step(1);
  gui.add(emitterSettings, 'velocityX', -300, 300).step(1);
  gui.add(emitterSettings, 'velocityY', -300, 300).step(1);
  gui.add(emitterSettings, 'velocityZ', -300, 300).step(1);

  this.get = function(key) {
    return settings[key];
  };

  this.set = function(key, value){
    settings[key] = value;
  };

  this.getEmitterSettings = function(){
    return emitterSettings;
  }

}

var Settings = new SettingsSingleton();
