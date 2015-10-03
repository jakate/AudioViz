var Smoke = function(){
  var scene, holder;
  var planes = [];

  this.hide = function() {
    _.each(planes, function(plane){
      plane.hide();
    });
  };

  this.show = function() {
    _.each(planes, function(plane){
      plane.show();
    });
  };

  this.update = function() {
    _.each(planes, function(plane){
      plane.update();
    });
  };

  this.blast = function() {
    // Add white smoke
    var videoPlane = new VideoPlane();
    videoPlane.init(holder, THREE.AdditiveBlending, false);
    planes.push(videoPlane);
  };

  this.init = function(threeScene) {
    scene = threeScene;

    holder = new THREE.Object3D();
    holder.position.z = 0;
    scene.add(holder);

    // Looping black smoke
    var videoPlane = new VideoPlane();
    videoPlane.init(holder, THREE.SubtractiveBlending, true);
    planes.push(videoPlane);
  };
};
