const SECONDS_IN_MINUTE = 60;

let secondsToMinutes = function(val) {
  return val / SECONDS_IN_MINUTE;
}

let minutesToSeconds = function(val) {
  return val * SECONDS_IN_MINUTE;
}

let stringToBoolean = function(val) {
  return val === 'true' ? true : false;
}

let stringToInt = function(val) {
  let result = parseInt(val, 10);
  if (!isNaN(result)) {
    return result;
  } else {
    throw new Error('Expected numeric integer setting');
  }
}

let stringToFloat = function(val) {
  let result = parseFloat(val);
  if (!isNaN(result)) {
    return result;
  } else {
    throw new Error('Expected numeric float setting');
  }
}

// public api
let conversion =  {
  secondsToMinutes,
  minutesToSeconds,
  stringToBoolean,
  stringToInt,
  stringToFloat
};

export {conversion};
