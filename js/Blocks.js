/* global THREE, Circle, Particles */

var Blocks = function(){

  var scene, cube, mesh, holder;
  var spot = -200;
  var boxAmount = 128;
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
      //var toScale = data.spectrum[diff * index] * 0.1 * data.volume || 0;
      var toScale = data.spectrum[diff * index] * 0.03;
      box.mesh.scale.y = toScale;
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

    mesh = new THREE.Mesh(cube, material);
    mesh.name = "box"+boxes.length;

    x = h + r * Math.cos(theta);
    y = k - r * Math.sin(theta);

    mesh.position.x = x -radius;
    mesh.position.y = y -radius;
    mesh.position.z = -40;

    var boxNum = boxes.length;
    var kerroin = boxNum / boxAmount;
    var rotation = 360 * kerroin;

    mesh.rotation.z = rotation * (Math.PI/180) * -1;

    boxes.push({
      mesh: mesh,
      originalPosition: {
        x: mesh.position.x,
        y: mesh.position.y,
        z: mesh.position.z
      },
    });

    holder.add(mesh);

    //spot += boxSize + 10;
    theta += step;
  }
};
