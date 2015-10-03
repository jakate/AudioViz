/* global THREE, ParticleStream */

var ParticleStreams = function() {

  var scene;
  var offserRadius = -200;
  var origRadius = (window.innerWidth < window.innerHeight ? window.innerWidth + offserRadius : window.innerHeight + offserRadius) / 4;  //(window.innerWidth < window.innerHeight ? window.innerWidth - 50 : window.innerHeight - 50) / 4;
  var maxRadius, radius, h, k, r;

  var lights = [
    {light: null, color: 0xffffff, stream: null},
    {light: null, color: 0xffffff, stream: null},
    {light: null, color: 0xffffff, stream: null},
    {light: null, color: 0xffffff, stream: null}
  ];

  var speed, stepLength, step;
  var radiusDirection = 1.001;

  this.init = function(threeScene){
    scene = threeScene;

    this.initSpeed(80);
    this.countRadius(origRadius);

    holder = new THREE.Object3D();
    scene.add(holder);
    addParticles();
  };

  this.initSpeed = function(bpm) {
    speed = bpm / 10;
    stepLength = 1000 / speed;
    step = 2 * Math.PI / stepLength;
  };

  this.hide = function(){
    holder.position.z = 1000;
  };

  this.countRadius = function(forceRadius) {
    if(!forceRadius) {
      forceRadius = origRadius;
    }

    var offset = 2.5;
    if(forceRadius*offset === maxRadius) {
      return;
    }

    maxRadius = forceRadius * offset;
    radius = forceRadius;
    h = radius;
    k = radius;
    r = radius;
  }

  this.update = function(colors, bpm, forceRadius){
    this.initSpeed(bpm);
    this.countRadius(forceRadius);

    _.each(lights, function(lightObj, index){
      var x = h + r * Math.cos(lightObj.theta);
      var y = k - r * Math.sin(lightObj.theta);

      lightObj.light.color.setHex(colors[index]);

      lightObj.light.position.x = x - radius;
      lightObj.light.position.y = y - radius;

      lightObj.theta += step;

      lightObj.stream.update(colors[index], lightObj.light.position);
    });

    holder.position.z = 0;

    r = r + radiusDirection;

    if(r > maxRadius ||
      r < maxRadius * -1) {
      radiusDirection = radiusDirection * -1;
    }
  };

  function addParticles() {
    addLights();

    _.each(lights, function(lightObj){
      var particles = new ParticleStream();
      particles.init(holder, lightObj.color, lightObj.light.position);

      lightObj.stream = particles;
    });
  }

  function addLights(){
    _.each(lights, function(light, index){
      var backgroundLight = new THREE.PointLight(light.color, 2, 600, 3);
      backgroundLight.position.set(0, 0, -199);
      holder.add(backgroundLight);

      light.light = backgroundLight;
      light.theta = (step * index * 5) * (stepLength / 4) * -1;
    });
  }

};
