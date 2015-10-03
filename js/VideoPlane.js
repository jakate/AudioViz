/* global THREE */

var VideoPlane = function(){

  var video, videoImageContext, videoImage, videoTexture, scene, movieScreen;
  var loop = false;
  var self = this;

  var videos = [
    'Field3Front.mp4',
    'Field4Front.mp4',
    'Field5Front.mp4',
    'Hit10Front.mp4',
    'Hit1Front.mp4',
    'Hit2Front.mp4',
    'Hit3Front.mp4',
    'Hit4Front.mp4',
    'Hit5front.mp4',
    'Hit6Front.mp4',
    'Hit7front.mp4',
    'Hit8front.mp4',
    'Hit9Front.mp4'
  ];

  this.hide = function() {
    if(loop === true) {
      movieScreen.position.z = 1000;
    }
  };

  this.update = function() {
    movieScreen.position.z = 0;
    if(!videoImageContext) {
      return;
    }

    videoImageContext.drawImage( video, 0, 0 );
    if ( videoTexture )  {
      videoTexture.needsUpdate = true;
    }
  };

  this.changeVideoEvent = function(e){
    self.changeVideo();
  }

  this.changeVideo = function(){
    if(!loop) {
      scene.remove(movieScreen);
      return;
    }

    var selectedVideo = videos[Math.floor(Math.random() * videos.length)];
    this.playVideo(selectedVideo);
  };

  this.playVideo = function(videoFile) {
    video.type = 'video/mp4';
    video.codecs = '"avc1.42E01E, mp4a.40.2"';
    video.src = 'videos/' + videoFile;

    video.load();
    video.play();
  }

  this.init = function(threeScene, blending, loopVideo) {
    loop = loopVideo || false;
    scene = threeScene;

    var selectedVideo = videos[Math.floor(Math.random() * videos.length)];
    video = document.createElement( 'video' );
    this.playVideo(selectedVideo);
    video.onended = this.changeVideoEvent;

    var w = 480;
    var h = 500;
    videoImage = document.createElement( 'canvas' );
    videoImage.width = w;
    videoImage.height = h;

    videoImageContext = videoImage.getContext( '2d' );
    videoImageContext.fillStyle = '#000000';
    videoImageContext.fillRect(0, 0, videoImage.width, videoImage.height);

    videoTexture = new THREE.VideoTexture( videoImage );
    videoTexture.minFilter = THREE.LinearFilter;
    videoTexture.magFilter = THREE.LinearFilter;
    videoTexture.format = THREE.RGBFormat;

    var movieMaterial = new THREE.MeshBasicMaterial( { map: videoTexture, overdraw: true} );

    if(blending){
      movieMaterial.transparent = true;
      movieMaterial.blending = blending;
    }

    var movieGeometry = new THREE.PlaneGeometry(w, h, 0, 0);
    movieScreen = new THREE.Mesh( movieGeometry, movieMaterial );
    movieScreen.position.set(-80, 0, 0);

    scene.add(movieScreen);
  };
};

