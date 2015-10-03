var Circle = function(){

  var settings = {
    meshAmount: 80,
    boxSize: {
      x: 5,
      y: 5,
      z: 5
    },
    maxLifeSpan: 200,
  };

  var cubeHolder;
  var boxes = [];

  // Cube settings
  var material = new THREE.MeshPhongMaterial( { color: 0xffffff, specular: 0xffffff, shininess: 50 } );
  var cube;
  var theta = 0;
  var step = 2*Math.PI/settings.meshAmount;

  var radius = (window.innerWidth < window.innerHeight ? window.innerWidth - 50 : window.innerHeight - 50) / 8;
  var h = radius;
  var k = radius;
  var r = radius;
  var blowOngoing = false;

  var counter = 0;

  this.discant = function(volume){
    if(blowOngoing) { return; }
    blowOngoing = true;

    for (var i = 0; i < (settings.meshAmount * (1 + volume)); i++) {
      addObject(volume);
    }

    setTimeout(function(){
      blowOngoing = false;
    }, 250);
  };


  this.update = function(data){
    if(counter %100 === 1) {
      removeDeadOnes();
    }

    cubeHolder.rotation.z = cubeHolder.rotation.z - 0.004;
    _.each(boxes, function(box){
      var scale = box.lifespan / box.origLifespan; //box.mesh.scale.x * 0.97;
      box.mesh.scale.x = scale;
      box.mesh.scale.y = scale;
      box.mesh.scale.z = scale;

      box.mesh.position.x += box.speed.x;
      box.mesh.position.y += box.speed.y;
      box.mesh.position.z += box.speed.z;

      box.mesh.rotation.x += box.rotationSpeed.x;
      box.mesh.rotation.y += box.rotationSpeed.y;
      box.mesh.rotation.z += box.rotationSpeed.z;

      box.lifespan = box.lifespan > 0 ? box.lifespan-1 : box.lifespan;
    });

    counter++;
  };

  this.draw = function(scene){
    addObjects(scene);
  };

  function removeDeadOnes(){
    boxes = _.reject(boxes,function(box){
      if(box.lifespan < 3) {
        cubeHolder.remove(cubeHolder.getObjectByName(box.mesh.name));
        return true;
      }
    });
  }

  function addObjects(scene){
    cubeHolder = new THREE.Object3D();
    cubeHolder.position.x = 0;
    cubeHolder.position.y = 0;
    cubeHolder.position.z = 0;

    for ( var i = 0; i < settings.meshAmount; i ++ ) {
      addObject(0);
    }

    scene.add(cubeHolder);
  }

  var mesh, x, y, offsetForce, speed, rSpeed, lifespan;
  function addObject(force){
    var sizeForce = force * 7;
    var size = 5 + Math.random() * sizeForce;
    cube = new THREE.BoxGeometry(size, size, size);

    mesh = new THREE.Mesh(cube, material);
    mesh.name = "box"+boxes.length;

    x = h + r * Math.cos(theta);
    y = k - r * Math.sin(theta);

    offsetForce = force * 100;
    mesh.position.x = x - r;
    mesh.position.y = y - r;
    mesh.position.z = Math.random() * offsetForce - offsetForce/2;

    mesh.rotation.x = Math.random() * 360;
    mesh.rotation.y = Math.random() * 360;
    mesh.rotation.z = Math.random() * 360;

    cubeHolder.add(mesh);

    speed = 0.8;
    rSpeed = 0.2;
    lifespan = Math.random() * settings.maxLifeSpan;

    boxes.push({
      mesh: mesh,
      origLifespan: lifespan,
      lifespan: lifespan,
      originalPosition: {
        x: mesh.position.x,
        y: mesh.position.y,
        z: mesh.position.z
      },
      rotationSpeed: {
        x: Math.random() * rSpeed - rSpeed/2,
        y: Math.random() * rSpeed - rSpeed/2,
        z: Math.random() * rSpeed - rSpeed/2
      },
      speed: {
        x: Math.random() * speed - speed/2,
        y: Math.random() * speed - speed/2,
        z: Math.random() * speed - speed/2
      }
    });

    theta += step;
  }

};
