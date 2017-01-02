const windowSvg = document.querySelector('.window-svg');
const owlGraphic = document.querySelector('.owl-graphic');
const eyes = document.querySelector('.eyes');
const leftEyeShine = document.querySelector('.left-eye-shine');
const rightEyeShine = document.querySelector('.right-eye-shine');
const leftWing = document.querySelector('.left-wing');
const rightWing = document.querySelector('.right-wing');
const leftFoot = document.querySelector('.left-foot');
const rightFoot = document.querySelector('.right-foot');

let animationIndex = 0;

let init = function() {
  if (typeof InstallTrigger !== 'undefined') {
    document.body.classList.add('ff');
  }
}

let sideToSide = function() {
  eyes.classList.toggle('side-to-side');
  leftEyeShine.classList.toggle('side-to-side');
  rightEyeShine.classList.toggle('side-to-side');
};

let upDown = function() {
  eyes.classList.toggle('up-down');
  leftEyeShine.classList.toggle('up-down');
  rightEyeShine.classList.toggle('up-down');
};

let aroundRight = function() {
  eyes.classList.toggle('around-right');
  leftEyeShine.classList.toggle('around-right');
  rightEyeShine.classList.toggle('around-right');
};

let aroundLeft = function() {
  eyes.classList.toggle('around-left');
}

let blinkEyes = function() {
  eyes.classList.toggle('blink');
};

let farFocus = function() {
  windowSvg.classList.toggle('window-visible');
}

let coverEyes = function() {
  rightWing.classList.toggle('forward-up');
  leftWing.classList.toggle('forward-up');
}

let longBreak = function() {
  owlGraphic.classList.toggle('wobble');
  leftWing.classList.toggle('flap-left');
  rightWing.classList.toggle('flap-right');
  rightFoot.classList.toggle('march');
  leftFoot.classList.toggle('march');
}

let EYE_ANIMATIONS = [
  sideToSide,
  aroundLeft,
  coverEyes,
  upDown,
  aroundRight,
  blinkEyes,
  farFocus
];

let EYE_ANIMATIONS_MESSAGES = [
  'Move your eyes from side to side',
  'Move your eyes around to the left',
  'Cover your eyes',
  'Move your eyes up and down',
  'Move your eyes around to the right',
  'Open and close your eyes',
  'Look out a window or far away object'
];

const longBreakAnimationMessage = 'Get up and go for for a walk';

let playAnimation = function() {
  EYE_ANIMATIONS[animationIndex]();
}

let stopAnimation = function() {
  EYE_ANIMATIONS[animationIndex]();
  animationIndex = (animationIndex === EYE_ANIMATIONS.length - 1) ? 0 : animationIndex + 1;
}

let getAnimationMessage = function() {
  return EYE_ANIMATIONS_MESSAGES[animationIndex];
}

let startStopLongBreakAnimation = function() {
  longBreak();
}

// public api
let animationControl =  {
  playAnimation,
  stopAnimation,
  getAnimationMessage,
  startStopLongBreakAnimation,
  longBreakAnimationMessage
};

init();

export {animationControl};
