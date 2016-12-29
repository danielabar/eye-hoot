import {app} from './app';

let update = function(key) {
  switch(key) {
    case '_eyeExerciseInterval':
      app.startWork();
      break;
    default:
      break;
  }
}

// public api
let controller = {
  update
};

export {controller};
