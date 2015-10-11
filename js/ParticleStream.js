var ParticleStream = function(){

  var clock = new THREE.Clock(true);
  var particleGroup, emitter, delta;

  this.update = function(intensity, color, pos){
    delta = clock.getDelta();
    var config = Settings.getEmitterSettings();

    emitter.position = new THREE.Vector3(pos.x, pos.y, pos.z);
    emitter.colorStart = new THREE.Color(color).multiplyScalar(intensity);
    emitter.positionSpread = new THREE.Vector3(config.positionSpread, config.positionSpread, config.positionSpread);
    emitter.velocity = new THREE.Vector3(config.velocityX, config.velocityY, config.velocityZ);
    emitter.sizeStart = config.sizeStart;
    emitter.sizeEnd = config.sizeEnd;

    particleGroup.tick(delta);
  };

  this.init = function(scene, color, pos){
      particleGroup = new SPE.Group({
        texture: THREE.ImageUtils.loadTexture('img/smokeparticle.png'),
        maxAge: 3,
        fog: false
      });

      emitter = new SPE.Emitter({
        position: new THREE.Vector3(pos.x, pos.y, pos.z),
        acceleration: new THREE.Vector3(0, 0, 0),
        velocity: new THREE.Vector3(0, 0, 10),
        colorStart: new THREE.Color(color),
        colorEnd: new THREE.Color('white'),
        sizeStart: 20,
        sizeEnd: 30,
        particleCount: 300
      });

      particleGroup.addEmitter( emitter );
      scene.add( particleGroup.mesh );
  };
};
