var AudioDrawer = function(){

  var camera, scene, renderer, container;
  var blocks = new Blocks();
  var smoke = new Smoke();
  var background = new Background();
  var particleStreams = new ParticleStreams();
  var counter = 0;

  var colors, controls, clock;

  this.init = function(initColors) {
    clock = new THREE.Clock(true);
    container = document.createElement('div');
    document.body.appendChild(container);

    camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 15000 );
    camera.position.z = 500;

    scene = new THREE.Scene();
    scene.fog = new THREE.Fog( 0x000000, 3500, 15000 );
    scene.fog.color.setHSL( 0.51, 0.4, 0.01 );

    addRenderer();

    particleStreams.init(scene);
    blocks.init(scene);
    smoke.init(scene);
    background.init(scene);

    colors = initColors;

    //For debugging
    //addControls();
  };

  this.resize = function() {
    renderer.setSize( window.innerWidth, window.innerHeight );
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
  };

  this.checkModes = function() {
    modes = Settings.getModes();

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
    this.checkModes();
    delta = clock.getDelta();

    if(controls) {
      controls.update(delta);
    }

    particleStreams.update(colors);
    background.update(colors, data, bpm);
    blocks.update(colors, data);
    smoke.update();
    renderer.render(scene, camera);

    counter++;
  };

  function addControls() {
    controls = new THREE.FlyControls(camera);
    controls.movementSpeed = 1000;
    controls.domElement = container;
    controls.rollSpeed = Math.PI / 24;
    controls.autoForward = false;
    controls.dragToLook = true;
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
};
