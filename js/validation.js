const svgValidEl = document.querySelector('.check-svg');
const svgValidSize = svgValidEl.getClientRects()[0];
const SVG_VALID_MARK_WIDTH = svgValidSize.width;
const SVG_VALID_MARK_HALF_HEIGHT = svgValidSize.height / 2;
const SVG_VALID_MARK_WIDTH_ADJUSTMENT = 3;
const SVG_VALID_MARK_HEIGHT_ADJUSTMENT = 5;

const ERROR_CSS_CLASS = 'settings-input-error';
const VISIBLE_CSS_CLASS = 'visible';

let isValidNumber = function(val, min, max) {
  let isNumeric = /^(?:[1-9]\d*|0)$/.test(val);
  let intVal = parseInt(val, 10);
  return isNumeric && (intVal >= min) && (intVal <= max);
}

let markElementInvalid = function(element) {
  element.classList.add(ERROR_CSS_CLASS);
}

let clearMarkers = function(element) {
  if (element.classList.contains(ERROR_CSS_CLASS)) {
    element.classList.remove(ERROR_CSS_CLASS);
  }
}

let _positionValidMark = function(element) {
  let inputWrapper = element.parentElement;
  let wrapperWidth = inputWrapper.clientWidth;
  let wrapperLeft = inputWrapper.offsetLeft;
  let wrapperHeight = inputWrapper.clientHeight;
  let wrapperTop = inputWrapper.offsetTop;
  let checkLeft = wrapperWidth + wrapperLeft - SVG_VALID_MARK_WIDTH + SVG_VALID_MARK_WIDTH_ADJUSTMENT;
  let checkTop = wrapperHeight + wrapperTop - SVG_VALID_MARK_HALF_HEIGHT + SVG_VALID_MARK_HEIGHT_ADJUSTMENT;
  svgValidEl.style.left = `${checkLeft}px`;
  svgValidEl.style.top = `${checkTop}px`;
}

let _fadeValidMarkInOut = function() {
  if (svgValidEl.classList.contains(VISIBLE_CSS_CLASS)) {
    svgValidEl.classList.remove(VISIBLE_CSS_CLASS);
  }
  svgValidEl.classList.add(VISIBLE_CSS_CLASS);
  setTimeout(() => {
    svgValidEl.classList.remove(VISIBLE_CSS_CLASS);
  }, 2000);
}

let markElementValid = function(element) {
  clearMarkers(element);
  _positionValidMark(element);
  _fadeValidMarkInOut();
}

// public api
let validation =  {
  isValidNumber,
  markElementInvalid,
  markElementValid,
  clearMarkers
};

export {validation};
