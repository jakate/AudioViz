var ParticleStreams = function() {

  var scene;
  var origRadius = (window.innerWidth > window.innerHeight ? window.innerWidth : window.innerHeight) / 4;
  var maxRadius, radius, r, holder;

  var lights = [
    {light: null, color: 0xffffff, stream: null},
    {light: null, color: 0xffffff, stream: null},
    {light: null, color: 0xffffff, stream: null},
    {light: null, color: 0xffffff, stream: null}
  ];

  var speed, stepLength, step;
  var origRadiusDirection = 1.001;
  var radiusDirection = origRadiusDirection;
  var hidden = false;
  var hideSpeed = 20;

  this.init = function(threeScene){
    scene = threeScene;

    this.initSpeed(80);
    this.countRadius(origRadius);

    holder = new THREE.Object3D();
    scene.add(holder);
    addParticles();
  };

  this.initSpeed = function(bpm) {
    speed = Settings.getSettings().speed;
    //speed = bpm / 10;
    stepLength = 1000 / speed;
    step = 2 * Math.PI / stepLength;
  };

  this.hide = function(){
    hidden = true;
  };

  this.show = function(){
    hidden = false;
  };

  this.countRadius = function(forceRadius) {
    if(Settings.getSettings().manualRadius) {
      radius = Settings.getSettings().radius;
      r = radius;
      return;
    }

    if(!forceRadius) {
      forceRadius = origRadius;
    }

    var offset = 2.5;
    if(forceRadius*offset === maxRadius) {
      return;
    }

    maxRadius = forceRadius * offset;
    radius = forceRadius;
    r = radius;
  };

  this.update = function(intensity, colors, bpm, forceRadius){
    this.initSpeed(bpm);
    this.countRadius(forceRadius);

    if(hidden){
      if(holder.position.z < 1000) {
        holder.position.z += hideSpeed;
      }
    } else {
      if(holder.position.z > 0) {
        holder.position.z -= hideSpeed;
      }
    }

    _.each(lights, function(lightObj, index){
      var x = radius + r * Math.cos(lightObj.theta);
      var y = radius - r * Math.sin(lightObj.theta);

      lightObj.light.color.setHex(colors[index]);

      lightObj.light.position.z = -199;
      lightObj.light.position.x = x - radius;
      lightObj.light.position.y = y - radius;
      lightObj.light.intensity = intensity;

      lightObj.theta += step;

      lightObj.stream.update(intensity, colors[index], lightObj.light.position);
    });

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
