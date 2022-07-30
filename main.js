import './style.css';

// DOM Elements
const video = document.querySelector('video');
const backCamera = document.querySelector('.back');
const frontCamera = document.querySelector('.front');
const fullscreen = document.querySelector('.fullscreen');

/**
 *
 * @param {MediaProvider} stream 要渲染的视频流
 */
function render(stream) {
  video.srcObject = stream;
}

/**
 * Gets the corresponding device camera based on a direction.
 *
 * @param {string} camera 设备的摄像头
 * @returns {ConstrainDOMString} 获取摄像头的 facingMode
 */
function getFacingMode(camera) {
  switch (camera) {
    case 'front':
      return 'user';
    case 'back':
      return 'environment';
    default:
      return 'environment';
  }
}

/**
 * 捕捉摄像头功能
 *
 * @param {string} camera 设备的摄像头
 */
function capture(camera) {
  navigator.mediaDevices
    .getUserMedia({
      video: { facingMode: getFacingMode(camera) },
    })
    .then(render)
    .catch(console.error);
}

/**
 * 视频全屏功能
 */
function enterFullScreen() {
  if (video.webkitEnterFullScreen) {
    // Mobile Safari
    video.webkitEnterFullScreen();
  } else if (video.requestFullscreen) {
    video.requestFullscreen();
  } else if (video.webkitRequestFullscreen) {
    // Regular Safari
    video.webkitRequestFullscreen();
  } else if (video.msRequestFullscreen) {
    // IE11 — I sincerely hope you don't own a phone running IE11...
    video.msRequestFullscreen();
  }
}

frontCamera.addEventListener('click', () => capture('front'));
backCamera.addEventListener('click', () => capture('back'));
fullscreen.addEventListener('click', enterFullScreen);
