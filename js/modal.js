import {controller} from './controller';
import owlImage from '../images/owl.png';

const modalEl = document.querySelector('#modal');
const modalOverlayEl = document.querySelector('#modalOverlay');
const modalCloseEl = document.querySelector('#modalClose');
const modalStartEl = document.querySelector('#modalStart');
const modalLogoEl = document.querySelector('#modalLogo');

modalLogoEl.src = owlImage;
modalCloseEl.addEventListener('click', () => close());
modalStartEl.addEventListener('click', () => close());

let open = function() {
  modalEl.classList.toggle('closed');
  modalOverlayEl.classList.toggle('closed');
};

let close = function() {
  modalEl.classList.toggle('closed');
  modalOverlayEl.classList.toggle('closed');
  controller.update('introModalClosed');
}

// public api
let modal = {
  open,
  close
};

export {modal};
