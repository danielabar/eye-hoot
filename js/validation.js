const svgCheckEl = document.querySelector('.check-svg');
const SVG_CHECK_WIDTH = svgCheckEl.getClientRects()[0].width;
const SVG_CHECK_HALF_HEIGHT = svgCheckEl.getClientRects()[0].height / 2;
const SVG_CHECK_WIDTH_ADJUSTMENT = 3;
const SVG_CHECK_HEIGHT_ADJUSTMENT = 2;
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
  // position checkmark
  let inputWrapper = element.parentElement;
  let wrapperWidth = inputWrapper.clientWidth;
  let wrapperLeft = inputWrapper.offsetLeft;
  let wrapperHeight = inputWrapper.clientHeight;
  let wrapperTop = inputWrapper.offsetTop;
  let checkLeft = wrapperWidth + wrapperLeft - SVG_CHECK_WIDTH + SVG_CHECK_WIDTH_ADJUSTMENT;
  let checkTop = wrapperHeight + wrapperTop - SVG_CHECK_HALF_HEIGHT - SVG_CHECK_HEIGHT_ADJUSTMENT;
  svgCheckEl.style.left = `${checkLeft}px`;
  svgCheckEl.style.top = `${checkTop}px`;

  // fade checkmark in and out
  if (svgCheckEl.classList.contains('visible')) {
    svgCheckEl.classList.remove('visible');
  }
  svgCheckEl.classList.add('visible');
  setTimeout(() => {
    svgCheckEl.classList.remove('visible');
  }, 2000)

}

// public api
let validation =  {
  isValidNumber,
  markElementInvalid,
  markElementValid
};

export {validation};
