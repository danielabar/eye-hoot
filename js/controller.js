import {app} from './app';
import {clock} from './clock';

let update = function(key, val) {
  switch(key) {
    case '_eyeExerciseInterval':
      app.startWork();
      break;
    case '_clockOpacity':
      clock.updateOpacity(val);
    default:
      break;
  }
}

// public api
let controller = {
  update
};

export {controller};
