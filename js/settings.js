import {persistence} from './persistence';
import {conversion} from './conversion';
import {validation} from './validation';

const DEFAULT_SOUND_ENABLED = 'true';

const containerEl = document.querySelector('.settings-container');
const eyeExerciseIntervalEl = document.getElementsByName('eyeExerciseInterval')[0];
const longBreakIntervalEl = document.getElementsByName('longBreakInterval')[0];
const longBreakDurationEl = document.getElementsByName('longBreakDuration')[0];
const soundEnabledEl = document.getElementById('soundEnabled');
const closeSettingsEl = document.getElementById('settingsClose');

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
  }

  _registerEvents() {
    eyeExerciseIntervalEl.addEventListener('blur', () => this._numericChangeHandler(eyeExerciseIntervalEl, '_eyeExerciseInterval'));
    longBreakIntervalEl.addEventListener('blur', () => this._numericChangeHandler(longBreakIntervalEl, '_longBreakInterval'));
    longBreakDurationEl.addEventListener('blur', () => this._numericChangeHandler(longBreakDurationEl, '_longBreakDuration'));
    soundEnabledEl.addEventListener('change', () => this._booleanChangeHandler(soundEnabledEl, '_soundEnabled'));
    closeSettingsEl.addEventListener('click', () => this._close());
  }

  _populateFields() {
    eyeExerciseIntervalEl.value = conversion.secondsToMinutes(this._eyeExerciseInterval);
    longBreakIntervalEl.value = conversion.secondsToMinutes(this._longBreakInterval);
    longBreakDurationEl.value = conversion.secondsToMinutes(this._longBreakDuration);
    soundEnabledEl.checked = this._soundEnabled;
  }

  _numericChangeHandler(element, property) {
    let newVal = element.value;
    if (newVal !== this[property] &&
        validation.isValidNumber(newVal, parseInt(element.min, 10), parseInt(element.max, 10))) {
      this[property] = conversion.minutesToSeconds(newVal);
      persistence.save(property, this[property]);
      validation.markElementValid(element);
    } else {
      validation.markElementInvalid(element);
    }
  }

  _booleanChangeHandler(element, property) {
    let newVal = element.checked;
    if (newVal !== this[property]) {
      this[property] = newVal;
      persistence.save(property, this[property]);
    }
  }

  _close() {
    containerEl.classList.add('settings-hidden');
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
}
