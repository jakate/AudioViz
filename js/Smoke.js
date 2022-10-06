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
    var videoPlane = new VideoPlane();

    var curColor = Settings.getCurrentColors()[0];
    var whiteSmokeColors = [3962322, 14362256]
    if(whiteSmokeColors.indexOf(curColor) > -1) {
      videoPlane.init(holder, THREE.AdditiveBlending, false, doneCallback);
    } else {
      videoPlane.init(holder, THREE.SubtractiveBlending, false, doneCallback);
    }

    planes.push(videoPlane);
  };

  this.init = function(threeScene) {
    scene = threeScene;

    holder = new THREE.Object3D();
    holder.position.z = 0;
    scene.add(holder);

    JEvents.addEventListener(this, 'SMOKE', this.blast);
  };

  function doneCallback(deletePlane){
    planes = _.reject(planes, function(plane){
      return deletePlane.id === plane.id;
    });
  }
};
