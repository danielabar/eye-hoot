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

  // TODO check localStorage, otherwise use defaults
  _init() {
    this._eyeExerciseInterval = DEFAULT_EYE_EXERCISE_INTERVAL;
    this._longBreakInterval = DEFAULT_LONG_BREAK_INTERVAL;
    this._eyeExerciseDuration = DEFAULT_EYE_EXERCISE_DURATION;
    this._longBreakDuration = DEFAULT_LONG_BREAK_DURATION;
    this._soundEnabled = true;
  }

  // TODO save to localStorage
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
