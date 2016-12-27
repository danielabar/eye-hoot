import breakStartAudioFile from '../sounds/tweet.mp3';
import breakOverAudioFile from '../sounds/ding.mp3';
import owlImage from '../images/owl.png';

var sideToSideButton;
var upDownButton;
var aroundButton;
var blinkButton;
var longBreakButton;

var messageElement;
var audioBreakStartEl;
var audioBreakOverEl;

var owlGraphic;
var owlSvg;

var eyes;
var leftEyeShine;
var rightEyeShine;
var leftWing;
var rightWing;
var leftFoot;
var rightFoot;

var clock;
var animationIndex = 0;
var timeElapsed = 0;
var EYE_ANIMATION_INTERVAL = 10;
var LONG_BREAK_ANIMATION_INTERVAL = 5 * 60;
var WORK_INTERVAL = DEFAULT_WORK_INTERVAL;
var TIME_TO_LONG_BREAK = 60 * 60;
var WORK_MESSAGE = 'Time to work';

export function start() {
  findElements();
  requestPermission();
};

var handleNotificationDenied = function() {
  dimBrighten();
  messageElement.innerHTML = 'Please allow notifications to use Eye Hoot.';
}

var requestPermission = function() {
  if (window.Notification && Notification.permission !== 'denied') {
    Notification.requestPermission(function(status) {
      if (status === 'granted') {
        registerEvents();
        startWork();
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
  longBreakButton = document.querySelector('.take-a-break');

  messageElement = document.querySelector('.message');

  audioBreakOverEl = document.querySelector('.break-over');
  audioBreakOverEl.src = breakOverAudioFile;
  audioBreakStartEl = document.querySelector('.break-start');
  audioBreakStartEl.src = breakStartAudioFile;

  owlGraphic = document.querySelector('.owl-graphic');
  owlSvg = document.querySelector('.owl-svg');

  eyes = document.querySelector('.eyes');
  leftEyeShine = document.querySelector('.left-eye-shine');
  rightEyeShine = document.querySelector('.right-eye-shine');
  leftWing = document.querySelector('.left-wing');
  rightWing = document.querySelector('.right-wing');
  leftFoot = document.querySelector('.left-foot');
  rightFoot = document.querySelector('.right-foot');
};

var updateMessage = function(message) {
  messageElement.innerHTML = message;
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

var longBreak = function() {
  owlGraphic.classList.toggle('wobble');
  leftWing.classList.toggle('flap-left');
  rightWing.classList.toggle('flap-right');
  rightFoot.classList.toggle('march');
  leftFoot.classList.toggle('march');
}

var dimBrighten = function() {
  owlSvg.classList.toggle('dim');
  messageElement.classList.toggle('dim');
}

var EYE_ANIMATIONS = [sideToSide, upDown, around, blinkEyes];
var EYE_ANIMATIONS_MESSAGES = [
  'Move your eyes from side to side',
  'Move your eyes up and down',
  'Move your eyes around in a circle',
  'Open and close your eyes'
];

var startAnimation = function() {
  dimBrighten();
  EYE_ANIMATIONS[animationIndex]();
  updateMessage(EYE_ANIMATIONS_MESSAGES[animationIndex]);
};

var stopAnimation = function() {
  EYE_ANIMATIONS[animationIndex]();
  animationIndex = (animationIndex === EYE_ANIMATIONS.length - 1) ? 0 : animationIndex + 1;
};

var startLongBreakAnimation = function() {
  dimBrighten();
  longBreak();
  updateMessage('Get up and go for a walk');
};

var stopBreakAnimation = function() {
  longBreak();
};

// only for testing
var registerEvents = function() {
  sideToSideButton.addEventListener('click', function(evt) { sideToSide(); });
  upDownButton.addEventListener('click', function(evt) { upDown(); });
  aroundButton.addEventListener('click', function(evt) { around(); });
  blinkButton.addEventListener('click', function(evt) { blinkEyes(); });
  longBreakButton.addEventListener('click', function(evt) { longBreak(); });
};

var notify = function() {
  var n = new Notification('Eye hoot', {
    body: 'Time for a break!',
    icon: owlImage,
    requireInteraction: true
  });
  audioBreakStartEl.play();
  n.onclick = notificationClickedHandler.bind(n);
};

var notificationClickedHandler = function() {
  window.focus();
  this.close();
  if (timeElapsed < TIME_TO_LONG_BREAK) {
    startAnimation();
    startAnimationClock(EYE_ANIMATION_INTERVAL);
  } else {
    startLongBreakAnimation();
    startAnimationClock(LONG_BREAK_ANIMATION_INTERVAL);
  }
}

var startAnimationClock = function(interval) {
  clock = $('.clock').FlipClock(interval, {
    clockFace: 'MinuteCounter',
    countdown: true,
    callbacks: {
      stop: stopClockHandler
    }
  });
}

var stopClockHandler = function() {
  if (timeElapsed < TIME_TO_LONG_BREAK) {
    stopAnimation();
    timeElapsed = timeElapsed + EYE_ANIMATION_INTERVAL + WORK_INTERVAL;
  } else {
    stopBreakAnimation();
    timeElapsed = 0;
  }
  audioBreakOverEl.play();
  startWork();
}

var startWork = function() {
  updateMessage(WORK_MESSAGE);
  dimBrighten();
  startWorkClock();
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
}
