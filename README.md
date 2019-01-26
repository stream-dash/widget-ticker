# Ticker

This is a stream "ticker" for displaying short blurbs of information now and then.

A logo can be placed on the lefthand side, in addition to any number of rotating messages be set for display.

Text longer than what the box can hold will be displayed in a scrolling marquee format.

## Demo

[https://streamable.com/l8s65](https://streamable.com/l8s65)

## Pre-requesites
- NodeJS 8+

## Setup
- Clone down the entire streamassets repo with `git clone git@github.com:kolyaventuri/streamassets.git`
- cd into the ticker directory and install packages with `npm i`

## Configuration
- Set strings you want to use in the `src/strings.json` file
- Configure timings in the `src/config.json` file in the 

## Building
- Run `npm run build`
  - Files (bundle.js and image) will be written to `./webpack/dist/`
