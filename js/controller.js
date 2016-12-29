import {app} from './app';
import {clockContainer} from './clock-container';

let update = function(key, val) {
  switch(key) {
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
