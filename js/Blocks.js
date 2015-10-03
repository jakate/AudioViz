/* global THREE, Circle, Particles */

var Blocks = function(){

  var scene, cube, mesh, holder;
  var spot = -200;
  var boxAmount = 64;
  var boxSize = 4;
  var boxes = [];
  var material = new THREE.MeshPhongMaterial( { color: 0xffffff, specular: 0xffffff, shininess: 50 } );

  var x, y;
  var radOffset = -150;
  var radius = (window.innerWidth < window.innerHeight ? window.innerWidth + radOffset : window.innerHeight + radOffset) / 4;
  var h = radius;
  var k = radius;
  var r = radius;

  var step = 2*Math.PI/boxAmount;
  var theta = step * (boxAmount / 4) * -1;

  this.hide = function() {
    holder.position.z = 1000;
  };

  this.update = function(data) {
    holder.position.z = 0;
    var diff = Math.floor(data.spectrum.length / boxes.length);
    _.each(boxes, function(box, index){
      var scale = data.spectrum[diff * index] * 0.03;
      var toScale = scale < 0.01 ? 0.01 : scale;
      box.mesh.scale.y = toScale;
      box.mesh.position.y = boxSize * 1.5 * toScale;
    });
  };

  this.init = function(threeScene) {
    scene = threeScene;

    holder = new THREE.Object3D();
    holder.position.z = 0;
    scene.add(holder);

    for (var i = 0; i < boxAmount; i++) {
      addObject();
    }
  };

  function addObject(){
    cube = new THREE.BoxGeometry(boxSize, boxSize*3, boxSize);

    var meshHolder = new THREE.Object3D();
    meshHolder.name = "box"+boxes.length;

    mesh = new THREE.Mesh(cube, material);

    x = h + r * Math.cos(theta);
    y = k - r * Math.sin(theta);

    meshHolder.position.x = x -radius;
    meshHolder.position.y = y -radius;
    meshHolder.position.z = -40;

    mesh.position.y = boxSize*3;

    var boxNum = boxes.length;
    var kerroin = boxNum / boxAmount;
    var rotation = 360 * kerroin;

    meshHolder.rotation.z = rotation * (Math.PI/180) * -1;
    //mesh.rotation.x = 45;

    boxes.push({
      mesh: mesh,
      originalPosition: {
        x: meshHolder.position.x,
        y: meshHolder.position.y,
        z: meshHolder.position.z
      },
    });

    meshHolder.add(mesh);

    holder.add(meshHolder);

    //spot += boxSize + 10;
    theta += step;
  }
};
