/* global THREE */

var Particles = function(){

  var particleSystem;
  var clock = new THREE.Clock(true);
  var tick = 0;
  var options = {
    position: new THREE.Vector3(0, 0, 450),
    positionRandomness: 1,
    velocity: new THREE.Vector3(),
    velocityRandomness: 2,
    color: 0xaa88ff,
    colorRandomness: 0.2,
    turbulence: 0,
    lifetime: 12,
    size: 1,
    sizeRandomness: 2
  };

  var spawnerOptions = {
    spawnRate: 3000,
    horizontalSpeed: 1.5,
    verticalSpeed: 1.33,
    timeScale: 0.9
  };

  this.blast = function(){
    var delta = clock.getDelta() * spawnerOptions.timeScale;
    tick += delta;

    for (var x = 0; x < spawnerOptions.spawnRate * delta; x++) {
      particleSystem.spawnParticle(options);
    }
  };

  this.update = function(){
    var delta = clock.getDelta() * spawnerOptions.timeScale;
    tick += delta;

    if (tick < 0) { tick = 0; }

    particleSystem.update(tick);
  };

  this.init = function(scene){
    particleSystem = new THREE.GPUParticleSystem({
      maxParticles: 25000
    });
    scene.add( particleSystem);

    var gui = new dat.GUI();
    gui.add(options, 'positionRandomness', 0, 100);
    gui.add(options, 'velocityRandomness', 0, 100);
    gui.add(options, 'turbulence', 0, 100);
    gui.add(options, 'lifetime', 0, 100);
    gui.add(options, 'size', 0, 100);
    gui.add(options, 'sizeRandomness', 0, 100);

  };
};
