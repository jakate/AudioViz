var ParticleStream = function(){
  var emitter;
  var blast = false;
  this.update = function(intensity, color, pos){

    var positionSpread = Settings.get('positionSpread');
    emitter.position = new THREE.Vector3(pos.x, pos.y, pos.z);
    emitter.colorEnd = new THREE.Color(color).multiplyScalar(intensity);
    emitter.positionSpread = new THREE.Vector3(positionSpread, positionSpread, positionSpread);

    if(blast) {
      var v = 1200;
      emitter.colorStart = new THREE.Color(color);
      emitter.velocity = new THREE.Vector3(Settings.get('velocityX'), Settings.get('velocityY'), v);
      emitter.acceleration = new THREE.Vector3(0, 0, v * -1);
      emitter.sizeStart = 40;
    } else {
      emitter.acceleration = new THREE.Vector3(0, 0, 0);
      emitter.acceleration = new THREE.Vector3(0, 0, -10);
      emitter.colorStart = new THREE.Color(color).multiplyScalar(intensity);
      emitter.velocity = new THREE.Vector3(Settings.get('velocityX'), Settings.get('velocityY'), Settings.get('velocityZ'));
      emitter.sizeStart = Settings.get('sizeStart');
    }

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

    JEvents.addEventListener(this, 'BLAST', this.blast);
  };

  this.blast = function(){
    blast = true;
    setTimeout(function(){ blast = false; }, 300);
  };
};
