# Eye Hoot

Eye Hoot reduces eye strain from computer use by reminding you to do a few quick simple eye exercises every 10 - 15 minutes, and to take a longer break every hour. The eye exercises are demonstrated with an animated owl and the time intervals are configurable.

## Usage

Simply browse to [https://eyehoot.site](https://eyehoot.site) (works best on Chrome) and keep that tab open while doing your work.
When the notifications come up, click on them and follow along with the owl to do the eye exercises.

Click on the settings button to customize Eye Hoot to your liking.

## Why I built this

Eye Hoot is inspired by [EyeLeo](http://eyeleo.com/overview), which is a desktop app for Windows only.
I wanted similar features but for the web, with no need to install any software.

## Attributions

* Tweet mp3 [Creative Commons](https://notificationsounds.com/message-tones/rvrb2-15).
* Ding mp3 [Sampling Plus 1.0](http://soundbible.com/1424-Air-Plane-Ding.html).
* Owl png [Clipart Panda](http://www.clipartpanda.com/clipart_images/owl-clipart-post-3-4374931), [Free clip art](http://www.clipartpanda.com/categories/owl-clip-art-free-cute), which I converted to SVG with [Inkscape](https://inkscape.org/en/), then lots of manual editing to make the paths useful for animation.
* Checkmark SVG [Wiki Commons](https://commons.wikimedia.org/wiki/File:Echo_curation_alt_check_mark.svg).
* Window SVG [Flaticon Basic License](https://www.shareicon.net/window-decoration-curtains-furniture-and-household-construction-and-tools-846321).
* Icons from [IcoMoon - Free](https://icomoon.io/app/#/select).

## Development

After cloning the repo:

```shell
npm install
npm start
```

Then browse to [http://localhost:8080](http://localhost:8080).

To run the optimized (production) bundle:

```shell
npm run serve-prod
```

Then browse to [http://localhost:8080](http://localhost:8080).

To build the production bundle:

```shell
npm run build-prod
```

The generated files will be on the `/docs` directory.

## License

MIT
