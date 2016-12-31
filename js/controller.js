import {app} from './app';
import {clockContainer} from './clock-container';

let update = function(key, val) {
  switch(key) {
    case 'introModalClosed':
      app.startContinue();
      break;
    case '_eyeExerciseInterval':
      app.startWork();
      break;
    case '_clockOpacity':
      clockContainer.updateOpacity(val);
    default:
      break;
  }
}

// public api
let controller = {
  update
};

export {controller};
