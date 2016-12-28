import {persistence} from './persistence';

const SECONDS_IN_MINUTE = 60;

const eyeExerciseIntervalEl = document.getElementsByName('eyeExerciseInterval')[0];
const longBreakIntervalEl = document.getElementsByName('longBreakInterval')[0];
const longBreakDurationEl = document.getElementsByName('longBreakDuration')[0];

export class Settings {
  constructor() {
    this._init();
    this._registerEvents();
    this._populateFields();
  }

  _init() {
    this._eyeExerciseDuration = DEFAULT_EYE_EXERCISE_DURATION;
    this._eyeExerciseInterval = persistence.retrieve('_eyeExerciseInterval', DEFAULT_EYE_EXERCISE_INTERVAL);
    this._longBreakInterval = persistence.retrieve('_longBreakInterval', DEFAULT_LONG_BREAK_INTERVAL);
    this._longBreakDuration = persistence.retrieve('_longBreakDuration', DEFAULT_LONG_BREAK_DURATION);
    this._soundEnabled = true;
  }

  // Nice to have: show check beside field if successfully updated
  _registerEvents() {
    eyeExerciseIntervalEl.addEventListener('blur', () => this._numericChangeHandler(eyeExerciseIntervalEl, '_eyeExerciseInterval'));
    longBreakIntervalEl.addEventListener('blur', () => this._numericChangeHandler(longBreakIntervalEl, '_longBreakInterval'));
    longBreakDurationEl.addEventListener('blur', () => this._numericChangeHandler(longBreakDurationEl, '_longBreakDuration'));
  }

  _populateFields() {
    eyeExerciseIntervalEl.value = this._secondsToMinutes(this._eyeExerciseInterval);
    longBreakIntervalEl.value = this._secondsToMinutes(this._longBreakInterval);
    longBreakDurationEl.value = this._secondsToMinutes(this._longBreakDuration);
  }

  // TODO validation
  _numericChangeHandler(element, property) {
    let newVal = element.value;
    if (newVal !== this[property]) {
      this[property] = this._minutesToSeconds(newVal);
      persistence.save(property, this[property]);
    }
  }

  _secondsToMinutes(val) {
    return val / SECONDS_IN_MINUTE;
  }

  _minutesToSeconds(val) {
    return val * SECONDS_IN_MINUTE;
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
