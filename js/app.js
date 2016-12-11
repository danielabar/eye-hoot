(function() {
  'use strict';

  var sideToSideButton;
  var upDownButton;
  var aroundButton;
  var blinkButton;
  var takeABreakButton;

  var owlGraphic;
  var eyes;
  var leftEyeShine;
  var rightEyeShine;
  var leftWing;
  var rightWing;
  var leftFoot;
  var rightFoot;

  var start = function(evt) {
    findElements();
    registerEvents();
  };

  var findElements = function() {
    sideToSideButton = document.querySelector('.side-to-side');
    upDownButton = document.querySelector('.up-down');
    aroundButton = document.querySelector('.around');
    blinkButton = document.querySelector('.blink');
    takeABreakButton = document.querySelector('.take-a-break');

    owlGraphic = document.querySelector('.owl-graphic');
    eyes = document.querySelector('.eyes');
    leftEyeShine = document.querySelector('.left-eye-shine');
    rightEyeShine = document.querySelector('.right-eye-shine');
    leftWing = document.querySelector('.left-wing');
    rightWing = document.querySelector('.right-wing');
    leftFoot = document.querySelector('.left-foot');
    rightFoot = document.querySelector('.right-foot');
  };

  var registerEvents = function() {
    sideToSideButton.addEventListener('click', function(evt) {
      eyes.classList.toggle('side-to-side');
      leftEyeShine.classList.toggle('side-to-side');
      rightEyeShine.classList.toggle('side-to-side');
    });

    upDownButton.addEventListener('click', function(evt) {
      eyes.classList.toggle('up-down');
      leftEyeShine.classList.toggle('up-down');
      rightEyeShine.classList.toggle('up-down');
    });

    aroundButton.addEventListener('click', function(evt) {
      eyes.classList.toggle('around');
      leftEyeShine.classList.toggle('around');
      rightEyeShine.classList.toggle('around');
    });

    blinkButton.addEventListener('click', function(evt) {
      eyes.classList.toggle('blink');
    });

    takeABreakButton.addEventListener('click', function(evt) {
      owlGraphic.classList.toggle('wobble');
      leftWing.classList.toggle('flap-left');
      rightWing.classList.toggle('flap-right');
      rightFoot.classList.toggle('march');
      leftFoot.classList.toggle('march');
    });
  };

  document.addEventListener('DOMContentLoaded', start);
}());
