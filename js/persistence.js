const APP_KEY = 'eyehoot';

let storageAvailable = function(type) {
	try {
		var storage = window[type],
			x = '__storage_test__';
		storage.setItem(x, x);
		storage.removeItem(x);
		return true;
	}
	catch(e) {
		return false;
	}
}

let localStorageAvailable = storageAvailable('localStorage');

let saveItem = function(key, value) {
  localStorage.setItem(`${APP_KEY}-${key}`, value);
}

let save = function(key, value) {
  if (localStorageAvailable) {
    saveItem(key, value);
  }
}

let retrieveItem = function(key) {
  return localStorage.getItem(`${APP_KEY}-${key}`);
}

let retrieve = function(key, defaultVal) {
  if (localStorageAvailable) {
    let result = retrieveItem(key);
    return result == undefined ? defaultVal : result;
  } else {
    return defaultVal;
  }
}

// public api
let persistence = {
  save,
  retrieve
};

export {persistence};
