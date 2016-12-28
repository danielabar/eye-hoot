const ERROR_CSS_CLASS = 'settings-input-error';

let isValidNumber = function(val, min, max) {
  let isNumeric = /^(?:[1-9]\d*|0)$/.test(val);
  let intVal = parseInt(val, 10);
  return isNumeric && (intVal >= min) && (intVal <= max);
}

let markElementInvalid = function(element) {
  element.classList.add(ERROR_CSS_CLASS);
}

let markElementValid = function(element) {
  if (element.classList.contains(ERROR_CSS_CLASS)) {
    element.classList.remove(ERROR_CSS_CLASS);
  }
}

// public api
let validation =  {
  isValidNumber,
  markElementInvalid,
  markElementValid
};

export {validation};
