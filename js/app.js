(function() {
  'use strict';

  var start = function() {
    document.querySelector('.side-to-side').addEventListener('click', function(evt) {
      document.querySelector('.eyes').classList.toggle('animated');
    });
  };

  document.addEventListener('DOMContentLoaded', function(evt) {
    start();
  });
}());
