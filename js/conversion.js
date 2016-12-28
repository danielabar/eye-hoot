const SECONDS_IN_MINUTE = 60;

let secondsToMinutes = function(val) {
  return val / SECONDS_IN_MINUTE;
}

let minutesToSeconds = function(val) {
  return val * SECONDS_IN_MINUTE;
}

// public api
let conversion =  {
  secondsToMinutes,
  minutesToSeconds
};

export {conversion};
