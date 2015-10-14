var ParticleStream = function(){
  var emitter;

  this.update = function(intensity, color, pos){
    var positionSpread = Settings.get('positionSpread');
    emitter.position = new THREE.Vector3(pos.x, pos.y, pos.z);
    emitter.colorStart = new THREE.Color(color).multiplyScalar(intensity);
    emitter.colorEnd = new THREE.Color(color).multiplyScalar(intensity);
    emitter.positionSpread = new THREE.Vector3(positionSpread, positionSpread, positionSpread);
    emitter.velocity = new THREE.Vector3(Settings.get('velocityX'), Settings.get('velocityY'), Settings.get('velocityZ'));
    emitter.sizeStart = Settings.get('sizeStart');
    emitter.sizeEnd = Settings.get('sizeEnd');
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
