(function() {
  'use strict';

  var notifyPermission = false;

  var testButton;
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

  var start = function(evt) {
    requestPermission();
  };

  var requestPermission = function() {
    if (window.Notification && Notification.permission !== 'denied') {
      Notification.requestPermission(function(status) {
        if (status === 'granted') {
          notifyPermission = true;
          findElements();
          registerEvents();
          startClock();
        } else {
          dpcument.querySelector('.clock').innterHTML = 'Sorry this app does not work without notifications for now.';
        }
      });
    }
  };

  var findElements = function() {
    testButton = document.querySelector('.test');
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
    testButton.addEventListener('click', function(evt) {
      eyes.classList.toggle('to-side');
    });

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

  var notify = function() {
    var n = new Notification('Eye break!', {
      body: 'Move your eyes from side to side.',
      icon: 'images/owl.png'
    });
    n.onclick = function() {
      // focus this app
      window.focus();
      n.close();

      // start animation
      eyes.classList.toggle('side-to-side');
      leftEyeShine.classList.toggle('side-to-side');
      rightEyeShine.classList.toggle('side-to-side');

      // set clock for animation interval
      clock = $('.clock').FlipClock(10, {
        clockFace: 'MinuteCounter',
        countdown: true,
        callbacks: {
          stop: function() {
            // turn off animation
            eyes.classList.toggle('side-to-side');
            leftEyeShine.classList.toggle('side-to-side');
            rightEyeShine.classList.toggle('side-to-side');

            // start all over again
            startClock();
          }
        }
      });
    }
  };

  var startClock = function() {
    // short interval to verify which event for countdown reached
    clock = $('.clock').FlipClock(15, {
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
