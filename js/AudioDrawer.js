/* global THREE, Particles, Blocks, ParticleStream, ParticleStreams */

var AudioDrawer = function(){

  var camera, scene, renderer, container;
  var blocks = new Blocks();
  var smoke = new Smoke();
  var background = new Background();

  var radius = (window.innerWidth < window.innerHeight ? window.innerWidth - 50 : window.innerHeight - 50);
  var lights;
  var particleStreams = new ParticleStreams();
  var counter = 0;

  var colors, modes;

  this.init = function(initModes, initColors) {
    container = document.createElement( 'div' );
    document.body.appendChild(container);

    camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 15000 );
    camera.position.z = 500;

    scene = new THREE.Scene();
    scene.fog = new THREE.Fog( 0x000000, 3500, 15000 );
    scene.fog.color.setHSL( 0.51, 0.4, 0.01 );

    addRenderer();
    addLights();

    particleStreams.init(scene);
    blocks.init(scene);
    smoke.init(scene);
    background.init(scene);

    colors = initColors;
    this.changeMode(initModes)
  };

  this.resize = function() {
    renderer.setSize( window.innerWidth, window.innerHeight );
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
  };

  this.changeMode = function(newModes) {
    modes = newModes;

    if(modes.background === false){
      background.hide();
    } else {
      background.show();
    }

    if(modes.blocks === false){
      blocks.hide();
    } else {
      blocks.show();
    }

    if(modes.circle === false && modes.flower === false){
      particleStreams.hide();
    } else {
      particleStreams.show();
    }

    if(modes.smoke === false){
      smoke.hide();
    } else {
      smoke.show();
    }
  };

  this.changeColors = function(newColors) {
    colors = newColors;
  };

  this.blast = function() {
    smoke.blast();
    smoke.update();
  };

  this.render = function(data, bpm) {
    if(modes.flower) {
      particleStreams.update(colors, 10, 60);
    } else {
      particleStreams.update(colors, bpm);
    }

    background.update(colors, data, bpm);
    blocks.update(data);
    smoke.update();
    renderer.render(scene, camera);

    counter++;
  };

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
