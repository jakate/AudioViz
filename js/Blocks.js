var Blocks = function(){
  var scene, holder, x, y, lights, colors;
  var boxAmount = 55;
  var boxSize = 6;
  var boxHeight = boxSize / 2;
  var boxes = [];

  var radOffset = -150;
  var radius = (window.innerWidth < window.innerHeight ? window.innerWidth + radOffset : window.innerHeight + radOffset) / 5;
  var h = radius;
  var k = radius;
  var r = radius;

  var step = 2 * Math.PI / boxAmount;
  var theta = step * (boxAmount / 4) * -1;

  var hidden = false;
  var hideSpeed = 20;

  this.hide = function() {
    hidden = true;
  };

  this.show = function() {
    hidden = false;
  };

  this.update = function(data) {
    var newColors = Settings.getCurrentColors();
    if(hidden){
      _.each(boxes, function(box, index){
        var toScale = box.mesh.scale.y * 0.9;
        box.mesh.scale.y = toScale;
        box.mesh.position.y = boxHeight / 2 * toScale;
      });

      holder.position.z = holder.position.z < 600 ? holder.position.z + hideSpeed : holder.position.z;
      return
    } else {
      holder.position.z = holder.position.z > 0 ? holder.position.z - hideSpeed : holder.position.z;
    }

    var diff = Math.round(data.spectrum.length / boxes.length);

    if(newColors !== colors) {
      colors = newColors;
      _.each(lights, function(lightObj, index){
        var color = colors[index] || 0xffffff;
        lightObj.light.color.setHex(color);
      });
    }

    _.each(boxes, function(box, index){
      var scale = data.spectrum[diff * index] * 0.1;
      var toScale = scale < 0.01 ? 0.01 : scale;
      box.mesh.scale.y = toScale;
      box.mesh.position.y = boxHeight / 2 * toScale;
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

    addLights();
  };

  function addObject(){
    var cube = new THREE.BoxGeometry(boxSize, boxHeight, boxSize);
    var material = new THREE.MeshPhongMaterial( { color: 0xffffff, specular: 0xffffff, shininess: 50 } );
    var mesh = new THREE.Mesh(cube, material);

    var meshHolder = new THREE.Object3D();
    meshHolder.name = "box"+boxes.length;


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

    theta += step;
  }

  function addLights(){
    var spot = radius;

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
