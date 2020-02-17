var captureButton = document.getElementById("capture_button");
var captureImage = document.getElementById("capture_image");
var captureDownloadButton = document.getElementById("capture_download_button");
var captureDownloadText = document.getElementById("capture_download_text");
var captureInput = document.getElementById("capture_input");
captureButton.addEventListener("click", function() {
  var scene = document.querySelector("a-scene");
  var video = document.getElementById("camera-bg");
  var width;
  var height;
  var snapshot;
  var context;

  if (scene && video) {
    width = scene.offsetWidth;
    height = scene.offsetHeight;

    // スクリーンショット用のcanvasを作成
    var snapshot = document.createElement("canvas");
    snapshot.width = width;
    snapshot.height = height;
    var context = snapshot.getContext("2d");

    var sourceWidth = video.videoWidth;
    var sourceHeight = video.videoHeight;
    var screenWidth = window.innerWidth;
    var screenHeight = window.innerHeight;

    var sx = 0;
    var sy = 0;
    var sw = sourceWidth;
    var sh = sourceHeight;

    // compute sourceAspect
    var sourceAspect = sourceWidth / sourceHeight;
    // compute screenAspect
    var screenAspect = screenWidth / screenHeight;

    // if sourceAspect > screenAspect, then trim the width, else trim the height
    if (sourceAspect > screenAspect) {
      sw = sourceHeight * screenAspect;
      sx = (sourceWidth - sw) / 2;
    } else {
      sh = sourceWidth / screenAspect;
      sy = (sourceHeight - sh) / 2;
    }

    context.drawImage(video, sx, sy, sw, sh, 0, 0, width, height);

    // A-Frameの映像をsnapshotに描画
    scene.setAttribute(
      "screenshot",
      "width:" + width + "; height: " + height + ";"
    );

    // components.screenshotの大きさを現在のwidthとheightに指定
    var capture = scene.components.screenshot.getCanvas("perspective");
    context.drawImage(capture, 0, 0, width, height);

    if (/iPhone|iPad|iPod/.test(navigator.userAgent)) {
      captureDownloadButton.setAttribute("style", "display: none;");
    } else {
      captureDownloadText.setAttribute("style", "display: none;");
    }
    captureImage.src = snapshot.toDataURL("image/jpeg", 1.0);
    captureDownloadButton.href = snapshot.toDataURL("image/jpeg", 1.0);

    captureInput.checked = true;
  }
});

let whiteFrame = document.querySelector(".frame-obj");
window.addEventListener("resize", function() {
  // リサイズ時に行う処理
  console.log("resize");
  let screenWidth = this.innerWidth;
  let screenHeight = this.innerHeight;
  console.log(screenWidth);
  console.log(screenHeight);

  if (screenWidth < 380) {
    console.log(whiteFrame);
    whiteFrame.setAttribute("scale", "2 2 2");
  } else if (screenWidth > 380) {
    whiteFrame.setAttribute("scale", "3 3 3");
    console.log(whiteFrame);
  }
});

window.addEventListener("load", function() {
  let whiteFrame = document.querySelector(".frame-obj");
  let screenWidth = this.innerWidth;
  let screenHeight = this.innerHeight;
  console.log(screenWidth);
  console.log(screenHeight);

  if (screenWidth < 380) {
    console.log("380以下");
    whiteFrame.setAttribute("scale", "2.0 2.0 2.0");
  } else if (380 <= screenWidth) {
    console.log("380以上");
    console.log(whiteFrame);
    whiteFrame.setAttribute("scale", "2.3 2.3 2.3");
  }
  /*
   * 縦横比の設定
   */
  var stampList = document.querySelectorAll('img[id*="stamp"]');
  var stampListNode = Array.prototype.slice.call(stampList, 0);
  stampListNode.forEach(function(e) {
    var stampImgWidth = e.naturalWidth;
    var stampImgHeight = e.naturalHeight;
    var stampImgHeightRate = stampImgHeight / stampImgWidth;
    var stampA = document.getElementById(e.id + "_id");
    stampA.setAttribute("width", 1);
    stampA.setAttribute("height", stampImgHeightRate);
  });
});

// jQuery(function ($) {
//   $(window).on("orientationchange", function (e) {
//     var stampId = '';
//     var oldElm = '';
//     //向き切り替え時の処理
//     if (window.orientation == 0) { // 横から縦に切り替わった時
//       if (navOpen.hasClass('showing_nav')) {
//         HandleStampModal('0');
//       } else { // 横から縦に変わった時
//         if (window.matchMedia("(min-width: 667px)").matches && (window.matchMedia("(min-height: 667px)"))) {
//           HandleStampModal('100%');
//         } else {
//           HandleStampModal('100%');
//         }
//       }
//       if (stampId) {
//         oldElm.hide();
//         //切り替え後のためのスタンプのIdを取ってきて貼る
//         stampId = parseInt(stampId) - 1;
//         var stampEl = $('#stamp_' + stampId);
//         stampEl.show();
//       }
//     } else { // 縦から横
//       if (navOpen.hasClass('showing_nav')) {
//         HandleStampModal('100%');
//       } else {
//         HandleStampModal('100%');
//       }
//       if (stampId) {
//         oldElm.hide();
//         //切り替え後のためのスタンプのIdを取ってきて貼る
//         stampId = parseInt(stampId) + 1;
//         var stampEl = $('#stamp_' + stampId);
//         stampEl.show();
//       }
//     }
//   });
// });

// window.addEventListener("orientationchange", function() {
//   if (window.orientatin == 0) {
//     if (navOpen.classList.contains("showing_nav")) {
//       HandleStampModal(true, 0);
//     } else {
//       HandleStampModal(false, 0);
//     }
//   } else {
//     if (navOpen.classList.contains("showing_nav")) {
//       HandleStampModal(true, 0);
//     } else {
//       HandleStampModal(false, 0);
//     }
//   }
// });
