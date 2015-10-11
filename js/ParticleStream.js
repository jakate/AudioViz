var ParticleStream = function(){
  var emitter;

  this.update = function(intensity, color, pos){
    var config = Settings.getEmitterSettings();
    emitter.position = new THREE.Vector3(pos.x, pos.y, pos.z);
    emitter.colorStart = new THREE.Color(color).multiplyScalar(intensity);
    emitter.colorEnd = new THREE.Color(color).multiplyScalar(intensity);
    emitter.positionSpread = new THREE.Vector3(config.positionSpread, config.positionSpread, config.positionSpread);
    emitter.velocity = new THREE.Vector3(config.velocityX, config.velocityY, config.velocityZ);
    emitter.sizeStart = config.sizeStart;
    emitter.sizeEnd = config.sizeEnd;
  };

  this.init = function(group, pos) {
    emitter = new SPE.Emitter({
      position: new THREE.Vector3(pos.x, pos.y, pos.z),
      acceleration: new THREE.Vector3(0, 0, 0),
      velocity: new THREE.Vector3(0, 0, 10),
      sizeStart: 20,
      sizeEnd: 30,
      particleCount: 300
    });

    group.addEmitter( emitter );
  };
};
