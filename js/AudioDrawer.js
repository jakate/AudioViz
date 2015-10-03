/* global THREE, Particles, Blocks, ParticleStream, ParticleStreams */

var AudioDrawer = function(){

  var camera, scene, renderer, container;
  var backgroundLight;
  var backgroundPlane;
  var blocks = new Blocks();
  var smoke = new Smoke();

  var radius = (window.innerWidth < window.innerHeight ? window.innerWidth - 50 : window.innerHeight - 50);
  var lights;

  var lowPeaks = [];
  var volumePeaks = [];
  var particleStreams = new ParticleStreams();
  var counter = 0;

  this.resize = function() {
    renderer.setSize( window.innerWidth, window.innerHeight );
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
  };

  this.blast = function() {
    smoke.blast();
    smoke.update();
  };

  this.render = function(data, bpm, modes, colors) {
    // Background
    if(modes.background) {
      var lowPeak = 0;
      var cutoff = 5; //Math.floor(data.spectrum.length * 0.5);
      _.each(data.spectrum, function(spec, index){
        if(index < cutoff) {
          lowPeak = spec > lowPeak ? spec : lowPeak;
          lowPeaks.push(spec);
        }
      });

      lowPeaks = _.uniq(lowPeaks);
      lowPeaks.sort(function compareNumbers(a, b) {
        return a - b;
      });

      var lowPeakThreshold = lowPeaks[Math.floor(lowPeaks.length * 0.75)];
      backgroundLight.color.setHex(colors[0]);

      if(lowPeak > lowPeakThreshold) {
        backgroundLight.position.z = -199 + data.volume * 100;
      } else {
        backgroundLight.position.z = backgroundLight.position.z < -199 ? -199 : backgroundLight.position.z - 1;
      }
    } else {
      backgroundLight.position.z = 1000;
    }

    // Blocks
    if(modes.blocks){
      blocks.update(data);
    } else {
      blocks.hide();
    }

    // Circle
    if(modes.circle || modes.flower){
      // Flower
      if(modes.flower) {
        particleStreams.update(colors, 10, 60);
      } else {
        particleStreams.update(colors, bpm);
      }
    } else {
      particleStreams.hide();
    }

    // Smoke
    smoke.update();
    if(!modes.smoke){
      smoke.hide();
    }

    renderer.render(scene, camera);

    counter++;
  };

  this.init = function() {
    container = document.createElement( 'div' );
    document.body.appendChild( container );

    camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 15000 );
    camera.position.z = 500;

    scene = new THREE.Scene();
    scene.fog = new THREE.Fog( 0x000000, 3500, 15000 );
    scene.fog.color.setHSL( 0.51, 0.4, 0.01 );

    addRenderer();
    addBackground();
    addLights();

    particleStreams.init(scene);
    blocks.init(scene);
    smoke.init(scene);
  };

  function addBackground(){
    var geometry = new THREE.PlaneBufferGeometry(1200, 800, 32 );
    var material = new THREE.MeshPhongMaterial( { color: 0xffffff, specular: 0xffffff, shininess: 50 } );
    backgroundPlane = new THREE.Mesh( geometry, material );
    backgroundPlane.position.z = -200;
    scene.add(backgroundPlane);

    backgroundLight = new THREE.PointLight(0x0000ff, 1, 700, 3);
    backgroundLight.position.set(0, 0, -199);
    scene.add(backgroundLight);
  }

  function addRenderer(){
    renderer = new THREE.WebGLRenderer( { antialias: false, alpha: false } );
    renderer.setClearColor( scene.fog.color );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    container.appendChild( renderer.domElement );

    renderer.gammaInput = true;
    renderer.gammaOutput = true;
  }

  function addLights(){
    var spot = radius * 2 / 10;

    lights = [
      {distance: 650, color: 0xff0099, origPos: {x: spot, y: spot, z: 100}},
      {distance: 650, color: 0xff0099, origPos: {x: spot * -1, y: spot, z: 100}},
      {distance: 650, color: 0xff0099, origPos: {x: spot * -1, y: spot * -1, z: 100}},
      {distance: 650, color: 0xff0099, origPos: {x: spot, y: spot * -1, z: 100}}
    ];

    for (var i = 0; i < lights.length; i++) {
      var light = new THREE.PointLight(lights[i].color, 830, lights[i].distance, 30);
      light.position.set(lights[i].origPos.x, lights[i].origPos.y, lights[i].origPos.z);
      scene.add(light);

      lights[i].light = light;
    }
  }
};
