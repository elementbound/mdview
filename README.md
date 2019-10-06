# mdview #

View Markdown files in your terminal!

![mdview](assets/mdview.gif)

## Features ##

* Open Markdown files in your terminal
* Follow links between the files
* Unknown files are presented as-is
* Render images as ASCII grayscales
* Configure via environment variables

## Requirements ##

* [node.js](https://nodejs.org/en/download/)
* [lynx](https://lynx.browser.org/)
* [imagemagick](https://imagemagick.org/)
  * Only needed for image rendering, can be turned off. See [configuration](.env.defaults)

## Install ##

Install `lynx` and `imagemagick` with your package manager of choice. For example: 

```sh
sudo apt install lynx imagemagick
```

Install `mdview` from Github, using `npm`:

```sh
npm install -g @elementbound/mdview
```

## Usage ##

Open any markdown file with `mdview`:

```sh
mdview README.md
```

## Documentation ##

This package provides two components - `mdview` and `mdserve`.

`mdserve` is a HTTP server that renders markdown documents as HTML. It includes image conversion logic as well, so images show up in some way. 

`mdview` launches `mdserve` when needed, and opens the given document in `lynx`.

### Endpoints ###

| URL              | Description                          |
| ---------------- | ------------------------------------ |
| `/render/{path}` | Render the file under `path` as HTML |
| `/ping`          | Returns `pong` if the server is up   |
| `/pid`           | Returns the server's process ID      |

> NOTE: The server only accepts requests from the local machine.

## Configuration ##

The server can be configured via environment variables. Which also means that you can plop your variables in your `.bashrc` or similar.

For reference, see [`.env.defaults`](.env.defaults)