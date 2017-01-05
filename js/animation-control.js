const windowSvg = document.querySelector('.window-svg');
const owlGraphic = document.querySelector('.owl-graphic');
const eyes = document.querySelector('.eyes');
const leftEyeShine = document.querySelector('.left-eye-shine');
const rightEyeShine = document.querySelector('.right-eye-shine');
const leftWing = document.querySelector('.left-wing');
const rightWing = document.querySelector('.right-wing');
const feet = document.querySelectorAll('.foot');
const leftFoot = document.querySelector('.left-foot');
const rightFoot = document.querySelector('.right-foot');

let animationIndex = 0;

let init = function() {
  if (typeof InstallTrigger !== 'undefined') {
    document.body.classList.add('ff');

    // owl-graphic: transform-origin: center bottom
    const owlGraphicBbox = owlGraphic.getBBox();
    const owlGraphicToX = owlGraphicBbox.x + (owlGraphicBbox.width / 2);
    const owlGraphicToY = owlGraphicBbox.y + owlGraphicBbox.height;
    owlGraphic.style['transform-origin'] = `${owlGraphicToX}px ${owlGraphicToY}px`;

    // eyes transform-origin: 50% 50%
    const eyesBbox = eyes.getBBox();
    const eyesToX = eyesBbox.x + (eyesBbox.width / 2);
    const eyesToY = eyesBbox.y + (eyesBbox.height / 2);
    eyes.style['transform-origin'] = `${eyesToX}px ${eyesToY}px`;

    // left-wing transform-origin: right top
    const leftWingBbox = leftWing.getBBox();
    const leftWingToX = leftWingBbox.x + leftWingBbox.width;
    const leftWingToY = leftWingBbox.y;
    leftWing.style['transform-origin'] = `${leftWingToX}px ${leftWingToY}px`;

    // right-wing transform-origin: left top
    const rightWingBbox = rightWing.getBBox();
    const rightWingToX = rightWingBbox.x;
    const rightWingToY = rightWingBbox.y;
    rightWing.style['transform-origin'] = `${rightWingToX}px ${rightWingToY}px`;

    // foot transform-origin: center top
    for (let i = 0; i < feet.length; i++) {
      let footEl = feet[i];
      let footBbox = footEl.getBBox();
      let footToX = footBbox.x + (footBbox.width / 2);
      let footToY = footBbox.y;
      footEl.style['transform-origin'] = `${footToX}px ${footToY}px`;
    }
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
  leftEyeShine.classList.toggle('around-left');
  rightEyeShine.classList.toggle('around-left');
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
