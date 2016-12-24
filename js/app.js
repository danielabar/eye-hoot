(function() {
  'use strict';

  var notifyPermission = false;

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

  var clock;
  var animationIndex = 0;
  var EYE_ANIMATION_INTERVAL = 10;
  var WORK_INTERVAL = 15; // short for testing

  var start = function(evt) {
    requestPermission();
  };

  var handleNotificationDenied = function() {
    document.querySelector('.message').innerHTML = 'Sorry this app does not work without notifications for now.';
  }

  var requestPermission = function() {
    if (window.Notification && Notification.permission !== 'denied') {
      Notification.requestPermission(function(status) {
        if (status === 'granted') {
          notifyPermission = true;
          findElements();
          registerEvents();
          startWorkClock();
        } else {
          handleNotificationDenied();
        }
      });
    } else {
      handleNotificationDenied();
    }
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

  var sideToSide = function() {
    eyes.classList.toggle('side-to-side');
    leftEyeShine.classList.toggle('side-to-side');
    rightEyeShine.classList.toggle('side-to-side');
  };

  var upDown = function() {
    eyes.classList.toggle('up-down');
    leftEyeShine.classList.toggle('up-down');
    rightEyeShine.classList.toggle('up-down');
  };

  var around = function() {
    eyes.classList.toggle('around');
    leftEyeShine.classList.toggle('around');
    rightEyeShine.classList.toggle('around');
  };

  var blinkEyes = function() {
    eyes.classList.toggle('blink');
  };

  var takeABreak = function() {
    owlGraphic.classList.toggle('wobble');
    leftWing.classList.toggle('flap-left');
    rightWing.classList.toggle('flap-right');
    rightFoot.classList.toggle('march');
    leftFoot.classList.toggle('march');
  }

  var EYE_ANIMATIONS = [sideToSide, upDown, around, blinkEyes];
  var BODY_ANIMATIONS = [takeABreak];

  var startAnimation = function() {
    EYE_ANIMATIONS[animationIndex]();
  };

  var stopAnimation = function() {
    EYE_ANIMATIONS[animationIndex]();
    animationIndex = (animationIndex === EYE_ANIMATIONS.length - 1) ? 0 : animationIndex + 1;
  };

  // only for testing
  var registerEvents = function() {
    sideToSideButton.addEventListener('click', function(evt) { sideToSide(); });
    upDownButton.addEventListener('click', function(evt) { upDown(); });
    aroundButton.addEventListener('click', function(evt) { around(); });
    blinkButton.addEventListener('click', function(evt) { blinkEyes(); });
    takeABreakButton.addEventListener('click', function(evt) { takeABreak(); });
  };

  var notify = function() {
    var n = new Notification('Eye hoot', {
      body: 'Time for a break!',
      icon: 'images/owl.png'
    });
    n.onclick = function() {
      window.focus();
      n.close();
      startAnimation();

      clock = $('.clock').FlipClock(EYE_ANIMATION_INTERVAL, {
        clockFace: 'MinuteCounter',
        countdown: true,
        callbacks: {
          stop: function() {
            stopAnimation();
            startWorkClock();
          }
        }
      });
    }
  };

  var startWorkClock = function() {
    clock = $('.clock').FlipClock(WORK_INTERVAL, {
      clockFace: 'MinuteCounter',
      countdown: true,
      callbacks: {
        stop: function() {
          notify();
        }
      }
    });
  };

  document.addEventListener('DOMContentLoaded', start);
}());
