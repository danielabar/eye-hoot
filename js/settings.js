const SECONDS_IN_MINUTE = 60;

const eyeExerciseIntervalEl = document.getElementsByName('eyeExerciseInterval')[0];
const longBreakIntervalEl = document.getElementsByName('longBreakInterval')[0];
const longBreakDurationEl = document.getElementsByName('longBreakDuration')[0];

export class Settings {
  constructor() {
    this._init();
    this._registerEvents();
  }

  // TODO check localStorage, otherwise use defaults
  _init() {
    this._eyeExerciseInterval = DEFAULT_EYE_EXERCISE_INTERVAL;
    this._longBreakInterval = DEFAULT_LONG_BREAK_INTERVAL;
    this._eyeExerciseDuration = DEFAULT_EYE_EXERCISE_DURATION;
    this._longBreakDuration = DEFAULT_LONG_BREAK_DURATION;
    this._soundEnabled = true;

    eyeExerciseIntervalEl.value = this._eyeExerciseInterval / SECONDS_IN_MINUTE;
  }

  // TODO re-usable change handler, validation, save to localStorage
  // Nice to have: show check beside field if successfully updated
  _registerEvents() {
    eyeExerciseIntervalEl.addEventListener('blur', () => {
      let newVal = eyeExerciseIntervalEl.value;
      if (newVal !== this._eyeExerciseInterval) {
        this._eyeExerciseInterval = newVal * SECONDS_IN_MINUTE;
      }
    })
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
