var ParticleStream = function(){

  var clock = new THREE.Clock(true);
  var particleGroup, emitter, delta;

  this.update = function(intensity, color, pos){
    delta = clock.getDelta();
    emitter.position = new THREE.Vector3(pos.x, pos.y, pos.z);
    emitter.colorStart = new THREE.Color(color).multiplyScalar(intensity);
    particleGroup.tick(delta);
  };

  this.init = function(scene, color, pos){
      particleGroup = new SPE.Group({
        texture: THREE.ImageUtils.loadTexture('img/smokeparticle.png'),
        maxAge: 4,
        fog: false
      });

      var spreadPos = 0;
      emitter = new SPE.Emitter({
        position: new THREE.Vector3(pos.x, pos.y, pos.z),
        positionSpread: new THREE.Vector3(spreadPos, spreadPos, spreadPos),
        acceleration: new THREE.Vector3(0, 0, 0),
        velocity: new THREE.Vector3(0, 0, 10),
        colorStart: new THREE.Color(color),
        colorEnd: new THREE.Color('white'),
        sizeStart: 20,
        sizeEnd: 30,
        particleCount: 500
      });

      particleGroup.addEmitter( emitter );
      scene.add( particleGroup.mesh );
  };
};
