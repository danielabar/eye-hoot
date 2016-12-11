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
    });
  };

  document.addEventListener('DOMContentLoaded', function(evt) {
    start();
  });
}());
