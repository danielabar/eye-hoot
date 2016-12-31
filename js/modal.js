import {controller} from './controller';
import {persistence} from './persistence';
import owlImage from '../images/owl.png';

const HAS_SEEN_INTRO_KEY = 'hasSeenIntro';

const modalEl = document.querySelector('#modal');
const modalOverlayEl = document.querySelector('#modalOverlay');
const modalCloseEl = document.querySelector('#modalClose');
const modalStartEl = document.querySelector('#modalStart');
const modalLogoEl = document.querySelector('#modalLogo');

modalLogoEl.src = owlImage;
modalCloseEl.addEventListener('click', () => close());
modalStartEl.addEventListener('click', () => close());

let show = function() {
  if (!_hasSeenIntro()) {
    open();
    persistence.save(HAS_SEEN_INTRO_KEY, true);
  } else {
    controller.update('introModalClosed');
  }
};

let open = function() {
  modalEl.classList.toggle('closed');
  modalOverlayEl.classList.toggle('closed');
};

let close = function() {
  modalEl.classList.toggle('closed');
  modalOverlayEl.classList.toggle('closed');
  controller.update('introModalClosed');
};

let _hasSeenIntro = function() {
  return persistence.exists(HAS_SEEN_INTRO_KEY);
};

// public api
let modal = {
  show,
  open,
  close
};

export {modal};
