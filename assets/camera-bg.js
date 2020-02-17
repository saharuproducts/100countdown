// Initializing camera background.
// quated from AR.js
// https://raw.githubusercontent.com/jeromeetienne/AR.js/master/aframe/build/aframe-ar.js
window.addEventListener('load', function () {
  // check API is available
  if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices || !navigator.mediaDevices.getUserMedia) {
    alert("このブラウザには対応していません");
    if (!window.location.href.match(/err/)) {
      location.href = 'https://webvr-lab.eishis.com/namecard/tobira/error.html';
    }
    var fctName = '';

    if (!navigator.mediaDevices) {
      fctName = 'navigator.mediaDevices';
    } else if (!navigator.mediaDevices.enumerateDevices) {
      fctName = 'navigator.mediaDevices.enumerateDevices';
    } else if (!navigator.mediaDevices.getUserMedia) {
      fctName = 'navigator.mediaDevices.getUserMedia';
    } else {
      console.assert(false);
    }

    console.log({
      name: '',
      message: 'WebRTC issue-! ' + fctName + ' not present in your browser'
    });
    return;
  }
  if (window.location.href.match(/err/)) {
    location.href = 'https://webvr-lab.eishis.com/namecard/tobira/index.html';
  }

  var video = document.getElementById('camera-bg');

  var adjustToWindow = function () {
    var sourceWidth = video.videoWidth;
    var sourceHeight = video.videoHeight;

    var screenWidth = window.innerWidth
    var screenHeight = window.innerHeight

    // compute sourceAspect
    var sourceAspect = sourceWidth / sourceHeight
    // compute screenAspect
    var screenAspect = screenWidth / screenHeight

    // if screenAspect < sourceAspect, then change the width, else change the height
    if (screenAspect < sourceAspect) {
      // compute newWidth and set .width/.marginLeft
      var newWidth = sourceAspect * screenHeight
      video.style.width = newWidth + 'px'
      video.style.marginLeft = -(newWidth - screenWidth) / 2 + 'px'

      // init style.height/.marginTop to normal value
      video.style.height = screenHeight + 'px'
      video.style.marginTop = '0px'
    } else {
      // compute newHeight and set .height/.marginTop
      var newHeight = 1 / (sourceAspect / screenWidth)
      video.style.height = newHeight + 'px'
      video.style.marginTop = -(newHeight - screenHeight) / 2 + 'px'

      // init style.width/.marginLeft to normal value
      video.style.width = screenWidth + 'px'
      video.style.marginLeft = '0px'
    }
  }

  video.addEventListener('loadedmetadata', adjustToWindow);
  window.addEventListener('resize', adjustToWindow);

  // Start video
  navigator.mediaDevices.enumerateDevices().then(function (devices) {
    navigator.mediaDevices.getUserMedia({
      audio: false,
      video: {
        facingMode: 'environment',
      }
    }).then(function (stream) {
      video.srcObject = stream;
      video.play();
    }).catch(function (error) {
      console.log(error);
    });
  }).catch(function (error) {
    console.log(error);
  });

  //インカメ/アウカメの切り替え
  var btnElem = document.getElementById('btn_switch_camera');
  var videoElem = document.getElementById('camera-bg');
  var isRear = true;
  var eventDeleted = false;
  btnElem.addEventListener('mousedown', switchCamera, false);
  btnElem.addEventListener('touchstart', switchCamera, false);

  function switchCamera(e) {
    if (!eventDeleted) {
      eventDeleted = true;
      if (e.type === 'mousedown') {
        btnElem.removeEventListener('touchstart', switchCamera, false);
      } else {
        btnElem.removeEventListener('mousedown', switchCamera, false);
      }
    }

    if (isRear) {
      navigator.mediaDevices.enumerateDevices().then(function (devices) {
        navigator.mediaDevices.getUserMedia({
          audio: false,
          video: {
            facingMode: "user"
          }
        }).then(function (stream) {
          videoElem.srcObject = stream;
          videoElem.play().then(function () {
            isRear = false;
          });
        }).catch(function (error) {
          console.log(error);
        });
      }).catch(function (error) {
        console.log(error);
      });
    } else {
      navigator.mediaDevices.enumerateDevices().then(function (devices) {
        navigator.mediaDevices.getUserMedia({
          audio: false,
          video: {
            facingMode: "environment"
          }
        }).then(function (stream) {
          videoElem.srcObject = stream;
          videoElem.play().then(function () {
            isRear = true;
          });
        }).catch(function (error) {
          console.log(error);
        });
      }).catch(function (error) {
        console.log(error);
      });
    }
  }

});
