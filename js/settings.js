import {persistence} from './persistence';
import {conversion} from './conversion';
import {validation} from './validation';
import {controller} from './controller';

const DEFAULT_SOUND_ENABLED = 'true';
const SETTINGS_HIDDEN_CLASS = 'settings-hidden';

const containerEl = document.querySelector('.settings-container');
const eyeExerciseIntervalEl = document.getElementsByName('eyeExerciseInterval')[0];
const longBreakIntervalEl = document.getElementsByName('longBreakInterval')[0];
const longBreakDurationEl = document.getElementsByName('longBreakDuration')[0];
const soundEnabledEl = document.getElementById('soundEnabled');
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
  }

  _registerEvents() {
    eyeExerciseIntervalEl.addEventListener('blur', () => this._numericChangeHandler(eyeExerciseIntervalEl, '_eyeExerciseInterval'));
    longBreakIntervalEl.addEventListener('blur', () => this._numericChangeHandler(longBreakIntervalEl, '_longBreakInterval'));
    longBreakDurationEl.addEventListener('blur', () => this._numericChangeHandler(longBreakDurationEl, '_longBreakDuration'));
    soundEnabledEl.addEventListener('change', () => this._booleanChangeHandler(soundEnabledEl, '_soundEnabled'));
    closeSettingsEl.addEventListener('click', () => this.close());
    openSettingsEl.addEventListener('click', () => this._open());
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
      controller.update(property);
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
}
