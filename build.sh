#!/bin/bash

dirname="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

# Structure

rm -rf $dirname/bin/*

mkdir -p $dirname/bin/js
mkdir -p $dirname/bin/js/cells
mkdir -p $dirname/bin/css
mkdir -p $dirname/bin/css/cells

# Node tools

npm install

# Components

bower install

cp $dirname/bower_components/jquery/dist/jquery.min.js $dirname/bin/js/
cp $dirname/bower_components/paper/dist/paper-full.min.js $dirname/bin/js/
cp $dirname/bower_components/tweenjs/build/tween.min.js $dirname/bin/js/
cp $dirname/bower_components/spectrum/spectrum.js $dirname/bin/js/
cp $dirname/bower_components/spectrum/spectrum.css $dirname/bin/css/
cp $dirname/bower_components/tinycolor/tinycolor.js $dirname/bin/js/

# Build

grunt
