var Chilicorn = function(){
  var video, videoImageContext, videoImage, videoTexture, scene, movieScreen;
  var self = this;

  this.show = function() {
    if(video) {
      video.play();
      movieScreen.position.z = 0;
    }
  };

  this.hide = function() {
    if(video) {
      video.pause();
      movieScreen.position.z = 1000;
    }
  };

  this.update = function() {
    if(!videoImageContext) {
      return;
    }

    videoImageContext.drawImage( video, 0, 0 );
    if ( videoTexture )  {
      videoTexture.needsUpdate = true;
    }
  };

  this.playVideo = function(videoFile) {
    video.type = 'video/mp4';
    video.codecs = '"avc1.42E01E, mp4a.40.2"';
    video.src = 'videos/' + videoFile;
    video.loop = true;

    video.load();
    video.play();
  };

  this.init = function(threeScene) {
    scene = threeScene;

    video = document.createElement('video');
    this.playVideo('horse.mp4');

    var w = 640;
    var h = 480;
    videoImage = document.createElement('canvas');
    videoImage.width = w;
    videoImage.height = h;

    videoImageContext = videoImage.getContext('2d');
    videoImageContext.fillStyle = '#000000';
    videoImageContext.fillRect(0, 0, videoImage.width, videoImage.height);

    videoTexture = new THREE.VideoTexture( videoImage );
    videoTexture.minFilter = THREE.LinearFilter;
    videoTexture.magFilter = THREE.LinearFilter;
    videoTexture.format = THREE.RGBFormat;

    var movieMaterial = new THREE.MeshBasicMaterial( { map: videoTexture, overdraw: true} );
    movieMaterial.transparent = true;
    movieMaterial.blending = THREE.AdditiveBlending;

    var movieGeometry = new THREE.PlaneBufferGeometry(w, h, 0, 0);
    movieScreen = new THREE.Mesh( movieGeometry, movieMaterial );
    movieScreen.position.set(220, -170, 80);

    scene.add(movieScreen);
  };

}
