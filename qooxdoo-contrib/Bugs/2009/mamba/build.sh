#/bin/sh

mkdir build
./generate.py build
cp build/script/mamba-0.js ../resources/pustefix/htdocs/script/mamba.js
