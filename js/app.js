import breakStartAudioFile from '../sounds/tweet.mp3';
import breakOverAudioFile from '../sounds/ding.mp3';
import owlImage from '../images/owl.png';
import {Settings} from './settings';
import {animationControl} from './animation-control';

const DIM_CSS_CLASS = 'dim';

let settings = new Settings();

let messageElement;
let audioBreakStartEl;
let audioBreakOverEl;

let owlSvg;

let clock;
let timeElapsed = 0;

const WORK_MESSAGE = 'Leave this running...';

let start = function() {
  findElements();
  requestPermission();
};

let handleNotificationDenied = function() {
  dim();
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

let dim = function() {
  [owlSvg, messageElement].forEach(el => el.classList.add(DIM_CSS_CLASS));
}

let brighten = function() {
  [owlSvg, messageElement].forEach(el => {
    if (el.classList.contains(DIM_CSS_CLASS)) {
      el.classList.remove(DIM_CSS_CLASS);
    }
  });
}

let startAnimation = function() {
  brighten();
  animationControl.playAnimation();
  updateMessage(animationControl.getAnimationMessage());
};

let stopAnimation = function() {
  animationControl.stopAnimation();
};

let startLongBreakAnimation = function() {
  brighten();
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
  playSound(audioBreakStartEl);
  n.onclick = notificationClickedHandler.bind(n);
};

let notificationClickedHandler = function() {
  window.focus();
  this.close();
  settings.close();
  if (timeElapsed < settings.longBreakInterval) {
    startAnimation();
    startAnimationClock(settings.eyeExerciseDuration);
  } else {
    startLongBreakAnimation();
    startAnimationClock(settings.longBreakDuration);
  }
}

let playSound = function(element) {
  if (settings.soundEnabled) {
    element.play();
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
  if (timeElapsed < settings.longBreakInterval) {
    stopAnimation();
    timeElapsed = timeElapsed + settings.eyeExerciseDuration + settings.eyeExerciseInterval;
  } else {
    stopBreakAnimation();
    timeElapsed = 0;
  }
  playSound(audioBreakOverEl);
  startWork();
}

let startWork = function() {
  updateMessage(WORK_MESSAGE);
  dim();
  startWorkClock();
};

let startWorkClock = function() {
  if (clock) {
    clock.reset();  // clear old callbacks
  }
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

// public api
let app = {
  start,
  startWork
};

export {app};
