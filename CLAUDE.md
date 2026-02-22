# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```shell
npm install       # install dependencies
npm start         # start webpack-dev-server with dev config (http://localhost:8080)
npm run serve-prod   # serve with production bundle
npm run build-prod   # build production bundle to /docs
```

There are no tests in this project.

## Architecture

Eye Hoot is a browser-based eye strain relief app. It uses webpack to bundle ES6 modules into a single JS file and SCSS into CSS, outputting everything to `/docs` (served as a GitHub Pages site at eyehoot.site).

### Entry point and module structure

`js/index.js` is the webpack entry point — it imports SCSS and the `app` module, then fires `app.start` on `DOMContentLoaded`.

The JS modules and their responsibilities:

- **`app.js`** — Core application logic. Manages two clock loops: a "work clock" that counts down to the next break, and an "animation clock" that counts down the break duration. Tracks `timeElapsed` to decide between short eye-exercise breaks and long breaks. Uses the browser Notifications API to alert users.
- **`controller.js`** — Mediator between `settings.js` and `app.js`/`clock-container.js`. Settings changes route through `controller.update(key, val)`.
- **`animation-control.js`** — Controls the SVG owl animations via CSS class toggling. Initializes SVG `transform-origin` values using `getBBox()` at load time (required because the SVG uses pixel-based coordinates). Cycles through 7 eye exercises.
- **`settings.js`** — ES6 class managing the settings sidebar. Reads/writes to `persistence.js` and notifies `controller.js` on changes.
- **`persistence.js`** — localStorage wrapper. All keys are namespaced with `eyehoot-` prefix.
- **`modal.js`** — Intro modal shown only on first visit (tracked via localStorage).
- **`conversion.js`** — Utility: seconds↔minutes conversion and string→number/boolean parsing.
- **`clock-container.js`** — Thin wrapper to update clock opacity via CSS.

### Webpack configs

Three webpack config files:
- `webpack.config.js` — Base config (shared). Outputs to `/docs`.
- `webpack-dev.config.js` — Extends base; sets short dev timer defaults (5s exercise duration, 60s intervals) via `webpack.DefinePlugin`.
- `webpack-production.config.js` — Extends base; sets real-world timer defaults (15s exercise, 15min interval, 5min long break, 1hr long break interval) and cleans `/docs` before build.

The timer constants (`DEFAULT_EYE_EXERCISE_DURATION`, `DEFAULT_EYE_EXERCISE_INTERVAL`, `DEFAULT_LONG_BREAK_DURATION`, `DEFAULT_LONG_BREAK_INTERVAL`) are compile-time globals injected by `DefinePlugin` — they are not `const` declarations in the code.

### External dependencies (CDN, not npm)

- **jQuery 1.10.2** and **FlipClock 0.7.8** are loaded from CDN in `index.template.ejs`. FlipClock requires the older jQuery version for `.reset()` to work. The `$('.clock').FlipClock(...)` calls in `app.js` rely on these globals.
- FlipClock CSS is also loaded from CDN.

### SVG animation approach

The owl graphic is an inline SVG in `index.template.ejs`. Animations are pure CSS, defined in `css/_animation.scss` and `css/_ff-animation.scss`. `animation-control.js` toggles CSS classes on SVG elements to start/stop animations. The `init()` function in `animation-control.js` sets pixel-based `transform-origin` on each animated element at load time because CSS percentage-based transforms on SVG elements required this workaround (now standardized in Chrome 64+, but the pixel approach is retained).

### Deployment

The `/docs` directory is committed to git and served directly by GitHub Pages. `npm run build-prod` regenerates it with content-hashed filenames. The `deploy.sh` script is an older approach (no longer used — webpack handles the build).
