const clockContainerEl = document.querySelector('.clock-container');

let updateOpacity = function(opacity) {
  clockContainerEl.style.opacity = opacity;
}

// public api
let clockContainer = {
  updateOpacity
};

export {clockContainer};
