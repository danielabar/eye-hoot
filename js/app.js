import breakStartAudioFile from '../sounds/tweet.mp3';
import breakOverAudioFile from '../sounds/ding.mp3';
import owlImage from '../images/owl.png';
import {Settings} from './settings';
import {animationControl} from './animation-control';

let settings = new Settings();

let messageElement;
let audioBreakStartEl;
let audioBreakOverEl;

let owlSvg;

let clock;
let timeElapsed = 0;

let EYE_EXERCISE_DURATION = DEFAULT_EYE_EXERCISE_DURATION;
let LONG_BREAK_DURATION = DEFAULT_LONG_BREAK_DURATION;
let LONG_BREAK_INTERVAL = DEFAULT_LONG_BREAK_INTERVAL;

const WORK_MESSAGE = 'Time to work';

export function start() {
  findElements();
  requestPermission();
};

let handleNotificationDenied = function() {
  dimBrighten();
  messageElement.innerHTML = 'Please allow notifications to use Eye Hoot.';
}

let requestPermission = function() {
  if (window.Notification && Notification.permission !== 'denied') {
    Notification.requestPermission(function(status) {
      if (status === 'granted') {
        startWork();
      } else {
        handleNotificationDenied();
      }
    });
  } else {
    handleNotificationDenied();
  }
};

let findElements = function() {
  messageElement = document.querySelector('.message');

  audioBreakOverEl = document.querySelector('.break-over');
  audioBreakOverEl.src = breakOverAudioFile;
  audioBreakStartEl = document.querySelector('.break-start');
  audioBreakStartEl.src = breakStartAudioFile;

  owlSvg = document.querySelector('.owl-svg');
};

let updateMessage = function(message) {
  messageElement.innerHTML = message;
};

let dimBrighten = function() {
  owlSvg.classList.toggle('dim');
  messageElement.classList.toggle('dim');
}

let startAnimation = function() {
  dimBrighten();
  animationControl.playAnimation();
  updateMessage(animationControl.getAnimationMessage());
};

let stopAnimation = function() {
  animationControl.stopAnimation();
};

let startLongBreakAnimation = function() {
  dimBrighten();
  animationControl.startStopLongBreakAnimation();
  updateMessage(animationControl.longBreakAnimationMessage);
};

let stopBreakAnimation = function() {
  animationControl.startStopLongBreakAnimation();
};

let notify = function() {
  let n = new Notification('Eye hoot', {
    body: 'Time for a break!',
    icon: owlImage,
    requireInteraction: true
  });
  audioBreakStartEl.play();
  n.onclick = notificationClickedHandler.bind(n);
};

let notificationClickedHandler = function() {
  window.focus();
  this.close();
  if (timeElapsed < LONG_BREAK_INTERVAL) {
    startAnimation();
    startAnimationClock(EYE_EXERCISE_DURATION);
  } else {
    startLongBreakAnimation();
    startAnimationClock(LONG_BREAK_DURATION);
  }
}

let startAnimationClock = function(interval) {
  clock = $('.clock').FlipClock(interval, {
    clockFace: 'MinuteCounter',
    countdown: true,
    callbacks: {
      stop: stopClockHandler
    }
  });
}

let stopClockHandler = function() {
  if (timeElapsed < LONG_BREAK_INTERVAL) {
    stopAnimation();
    timeElapsed = timeElapsed + EYE_EXERCISE_DURATION + settings.eyeExerciseInterval;
  } else {
    stopBreakAnimation();
    timeElapsed = 0;
  }
  audioBreakOverEl.play();
  startWork();
}

let startWork = function() {
  updateMessage(WORK_MESSAGE);
  dimBrighten();
  startWorkClock();
};

let startWorkClock = function() {
  clock = $('.clock').FlipClock(settings.eyeExerciseInterval, {
    clockFace: 'MinuteCounter',
    countdown: true,
    callbacks: {
      stop: function() {
        notify();
      }
    }
  });
}
