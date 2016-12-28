const owlGraphic = document.querySelector('.owl-graphic');
const eyes = document.querySelector('.eyes');
const leftEyeShine = document.querySelector('.left-eye-shine');
const rightEyeShine = document.querySelector('.right-eye-shine');
const leftWing = document.querySelector('.left-wing');
const rightWing = document.querySelector('.right-wing');
const leftFoot = document.querySelector('.left-foot');
const rightFoot = document.querySelector('.right-foot');

let animationIndex = 0;

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

let around = function() {
  eyes.classList.toggle('around');
  leftEyeShine.classList.toggle('around');
  rightEyeShine.classList.toggle('around');
};

let blinkEyes = function() {
  eyes.classList.toggle('blink');
};

let longBreak = function() {
  owlGraphic.classList.toggle('wobble');
  leftWing.classList.toggle('flap-left');
  rightWing.classList.toggle('flap-right');
  rightFoot.classList.toggle('march');
  leftFoot.classList.toggle('march');
}

let EYE_ANIMATIONS = [sideToSide, upDown, around, blinkEyes];
let EYE_ANIMATIONS_MESSAGES = [
  'Move your eyes from side to side',
  'Move your eyes up and down',
  'Move your eyes around in a circle',
  'Open and close your eyes'
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

export {animationControl};