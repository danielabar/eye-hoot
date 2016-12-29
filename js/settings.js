import {persistence} from './persistence';
import {conversion} from './conversion';
import {validation} from './validation';
import {controller} from './controller';

const DEFAULT_SOUND_ENABLED = 'true';
const DEFAULT_CLOCK_OPACITY = '1';
const SETTINGS_HIDDEN_CLASS = 'settings-hidden';

const containerEl = document.querySelector('.settings-container');
const eyeExerciseIntervalEl = document.getElementsByName('eyeExerciseInterval')[0];
const longBreakIntervalEl = document.getElementsByName('longBreakInterval')[0];
const longBreakDurationEl = document.getElementsByName('longBreakDuration')[0];
const soundEnabledEl = document.getElementById('soundEnabled');
const clockOpacityEl = document.getElementById('clockOpacity');
const closeSettingsEl = document.getElementById('settingsClose');
const openSettingsEl = document.getElementById('settingsOpen');

export class Settings {
  constructor() {
    this._init();
    this._registerEvents();
    this._populateFields();
  }

  _init() {
    this._eyeExerciseDuration = DEFAULT_EYE_EXERCISE_DURATION;
    this._eyeExerciseInterval = conversion.stringToInt(persistence.retrieve('_eyeExerciseInterval', DEFAULT_EYE_EXERCISE_INTERVAL));
    this._longBreakInterval = conversion.stringToInt(persistence.retrieve('_longBreakInterval', DEFAULT_LONG_BREAK_INTERVAL));
    this._longBreakDuration = conversion.stringToInt(persistence.retrieve('_longBreakDuration', DEFAULT_LONG_BREAK_DURATION));
    this._soundEnabled = conversion.stringToBoolean(persistence.retrieve('_soundEnabled', DEFAULT_SOUND_ENABLED));
    this._clockOpacity = conversion.stringToFloat(persistence.retrieve('_clockOpacity', DEFAULT_CLOCK_OPACITY));
  }

  _registerEvents() {
    // numeric inputs
    eyeExerciseIntervalEl.addEventListener('blur', () => this._numericChangeHandler(eyeExerciseIntervalEl, '_eyeExerciseInterval'));
    eyeExerciseIntervalEl.addEventListener('keypress', (evt) => this._keyPressHandler(eyeExerciseIntervalEl, '_eyeExerciseInterval', evt));
    longBreakIntervalEl.addEventListener('blur', () => this._numericChangeHandler(longBreakIntervalEl, '_longBreakInterval'));
    longBreakIntervalEl.addEventListener('keypress', (evt) => this._keyPressHandler(longBreakIntervalEl, '_longBreakInterval', evt));
    longBreakDurationEl.addEventListener('blur', () => this._numericChangeHandler(longBreakDurationEl, '_longBreakDuration'));
    longBreakDurationEl.addEventListener('keypress', (evt) => this._keyPressHandler(longBreakDurationEl, '_longBreakDuration', evt));
    // checkboxes
    soundEnabledEl.addEventListener('change', () => this._booleanChangeHandler(soundEnabledEl, '_soundEnabled'));
    // ranges
    clockOpacityEl.addEventListener('input', () => this._rangeChangeHandler(clockOpacityEl, '_clockOpacity'))
    // buttons
    closeSettingsEl.addEventListener('click', () => this.close());
    openSettingsEl.addEventListener('click', () => this._open());
  }

  _populateFields() {
    eyeExerciseIntervalEl.value = conversion.secondsToMinutes(this._eyeExerciseInterval);
    longBreakIntervalEl.value = conversion.secondsToMinutes(this._longBreakInterval);
    longBreakDurationEl.value = conversion.secondsToMinutes(this._longBreakDuration);
    clockOpacity.value = this._clockOpacity;
    soundEnabledEl.checked = this._soundEnabled;
  }

  _numericChangeHandler(element, property) {
    let isValid = true;
    let newVal = element.value;
    let currentVal = conversion.secondsToMinutes(this[property]).toString();
    if (newVal !== currentVal) {
      if (validation.isValidNumber(newVal, parseInt(element.min, 10), parseInt(element.max, 10))) {
        this[property] = conversion.minutesToSeconds(newVal);
        persistence.save(property, this[property]);
        validation.markElementValid(element);
        controller.update(property);
      } else {
        isValid = false;
        validation.markElementInvalid(element);
      }
    } else {
      validation.clearMarkers(element);
    }
    return isValid;
  }

  _keyPressHandler(element, property, evt) {
    if (evt.keyCode === 13) {
      let isValid = this._numericChangeHandler(element, property);
      if (!isValid) {
        element.focus();
      } else {
        element.blur();
      }
    }
  }

  _booleanChangeHandler(element, property) {
    let newVal = element.checked;
    if (newVal !== this[property]) {
      this[property] = newVal;
      persistence.save(property, this[property]);
    }
  }


  _rangeChangeHandler(element, property) {
    let newVal = element.value;
    controller.update(property, newVal);
    this[property] = newVal;
    persistence.save(property, this[property]);
  }

  close() {
    if (!containerEl.classList.contains(SETTINGS_HIDDEN_CLASS)) {
      containerEl.classList.add(SETTINGS_HIDDEN_CLASS);
    }
  }

  _open() {
    containerEl.classList.remove(SETTINGS_HIDDEN_CLASS);
  }

  get eyeExerciseInterval() {
    return this._eyeExerciseInterval;
  }

  get longBreakInterval() {
    return this._longBreakInterval;
  }

  get eyeExerciseDuration() {
    return this._eyeExerciseDuration;
  }

  get longBreakDuration() {
    return this._longBreakDuration;
  }

  get soundEnabled() {
    return this._soundEnabled;
  }

  get clockOpacity() {
    return this._clockOpacity;
  }
}
