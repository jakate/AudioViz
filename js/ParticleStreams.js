var ParticleStreams = function() {

  var scene;
  var maxRadius, radius, r, x, y, holder;

  var clock = new THREE.Clock(true);
  var particleGroup;
  var blast = false;

  var lights = [
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

    // Count the max radius of the circle
    var forceRadius = Settings.get('origRadius');
    var offset = 2.5;
    maxRadius = forceRadius * offset;
    radius = forceRadius;
    r = radius;

    holder = new THREE.Object3D();
    scene.add(holder);
    addParticles();

    JEvents.addEventListener(this, 'BLAST', this.blast);
  };

  this.blast = function(){
    blast = true;
    setTimeout(function(){ blast = false; }, 300);
  }

  this.initSpeed = function() {
    speed = blast === true ? 100 : Settings.get('speed');
    stepLength = 1000 / speed;
    step = 2 * Math.PI / stepLength;
  };

  this.hide = function(){
    hidden = true;
  };

  this.show = function(){
    hidden = false;
  };

  this.checkRadius = function() {
    if(Settings.get('manualRadius')) {
      radius = Settings.get('radius');
      r = radius;
    }
  };

  this.update = function(){
    var colors = Settings.getCurrentColors();
    this.initSpeed();
    this.checkRadius();

    if(hidden){
      if(holder.position.z < 1000) {
        holder.position.z += hideSpeed;
      }
    } else {
      if(holder.position.z > 0) {
        holder.position.z -= hideSpeed;
      }
    }

    var intensity = Settings.get('intensity');
    _.each(lights, function(lightObj, index){
      x = radius + r * Math.cos(lightObj.theta);
      y = radius - r * Math.sin(lightObj.theta);

      lightObj.light.position.x = x - radius
      lightObj.light.position.y = y - radius
      lightObj.light.intensity = intensity;
      lightObj.theta += step;

      lightObj.light.color.setHex(colors[index]);
      lightObj.stream.update(intensity, colors[index], lightObj.light.position);
    });

    r = r + radiusDirection;

    if(r > maxRadius ||
      r < maxRadius * -1) {
      radiusDirection = radiusDirection * -1;
    }

    particleGroup.tick(clock.getDelta());
  };

  function addParticles() {
    addLights();

    particleGroup = new SPE.Group({
      texture: THREE.ImageUtils.loadTexture('img/smokeparticle.png'),
      maxAge: 3,
      fog: false
    });

    holder.add( particleGroup.mesh );

    _.each(lights, function(lightObj){
      var particles = new ParticleStream();
      particles.init(particleGroup, lightObj.light.position);
      lightObj.stream = particles;
    });
  }

  function addLights(){
    _.each(lights, function(light, index){
      var backgroundLight = new THREE.PointLight(light.color, 2, 600, 3);
      backgroundLight.position.set(0, 0, -199);
      holder.add(backgroundLight);

      light.light = backgroundLight;
      light.theta = (step * index * 5) * (stepLength / lights.length) * -1;
    });
  }
};
