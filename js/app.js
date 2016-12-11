(function() {
  'use strict';

  var start = function() {

    document.querySelector('.side-to-side').addEventListener('click', function(evt) {
      document.querySelector('.eyes').classList.toggle('side-to-side');
      document.querySelector('.left-eye-shine').classList.toggle('side-to-side');
      document.querySelector('.right-eye-shine').classList.toggle('side-to-side');
    });

    document.querySelector('.up-down').addEventListener('click', function(evt) {
      document.querySelector('.eyes').classList.toggle('up-down');
      document.querySelector('.left-eye-shine').classList.toggle('up-down');
      document.querySelector('.right-eye-shine').classList.toggle('up-down');
    });

    document.querySelector('.around').addEventListener('click', function(evt) {
      document.querySelector('.eyes').classList.toggle('around');
      document.querySelector('.left-eye-shine').classList.toggle('around');
      document.querySelector('.right-eye-shine').classList.toggle('around');
    });

    document.querySelector('.blink').addEventListener('click', function(evt) {
      document.querySelector('.eyes').classList.toggle('blink');
    });

    document.querySelector('.take-a-break').addEventListener('click', function(evt) {
      document.querySelector('.left-wing').classList.toggle('flap-left');
      document.querySelector('.right-wing').classList.toggle('flap-right');
      document.querySelector('.right-foot').classList.toggle('march');
      document.querySelector('.left-foot').classList.toggle('march');
    });
  };

  document.addEventListener('DOMContentLoaded', function(evt) {
    start();
  });
}());
