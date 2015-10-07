var Background = function(){

  var backgroundLight, backgroundPlane, lowPeakThreshold, volumePeaksThreshold, lowPeak, cutoff;
  var lowPeaks = [];
  var volumePeaks = [];
  var hidden = false;
  var hideSpeed = 2;

  this.hide = function() {
    hidden = true;
  };

  this.show = function() {
    hidden = false;
    holder.position.z = 0;
  };

  this.update = function(colors, data, bpm) {
    if(hidden) {
      backgroundLight.position.z = backgroundLight.position.z < 1000 ? backgroundLight.position.z + hideSpeed : backgroundLight.position.z;
      return;
    }

    lowPeak = 0;
    cutoff = Math.floor(data.spectrum.length * 0.05);
    _.each(data.spectrum, function(spec, index){
      if(index < cutoff) {
        lowPeak = spec > lowPeak ? spec : lowPeak;
        lowPeaks.unshift(spec);
      }
    });

    volumePeaks.unshift(data.volume);
    lowPeaks = lowPeaks.slice(0, 256)
    volumePeaks = volumePeaks.slice(0, 256)

    lowPeaks.sort(compareNumbers);
    volumePeaks.sort(compareNumbers);

    lowPeakThreshold = lowPeaks[Math.floor(lowPeaks.length * 0.99)];
    volumePeaksThreshold = volumePeaks[Math.floor(volumePeaks.length * 0.99)]

    if(lowPeak > lowPeakThreshold || data.volume > volumePeaksThreshold) {
      backgroundLight.position.z = -199 + data.volume * 400; //-199 + data.volume * 100;
    } else {
      var fadeSpeed = -2;
      backgroundLight.position.z = backgroundLight.position.z < -199 ? -199 : backgroundLight.position.z + fadeSpeed;
    }

    backgroundLight.color.setHex(colors[0]);
  };

  this.init = function(threeScene) {
    scene = threeScene;

    holder = new THREE.Object3D();
    holder.position.z = 0;
    scene.add(holder);

    addBackground();
  };

  function addBackground(){
    var geometry = new THREE.PlaneBufferGeometry(1200, 800, 32 );
    var material = new THREE.MeshPhongMaterial( { color: 0xffffff, specular: 0xffffff, shininess: 50 } );
    backgroundPlane = new THREE.Mesh( geometry, material );
    backgroundPlane.position.z = -200;
    scene.add(backgroundPlane);

    backgroundLight = new THREE.PointLight(0x0000ff, 1, 700, 3);
    backgroundLight.position.set(0, 0, -199);
    scene.add(backgroundLight);
  }

  function compareNumbers(a, b) {
    return a - b;
  }
};
