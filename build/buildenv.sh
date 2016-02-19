#!/bin/sh
echo Creating venv environment
virtualenv --no-site-packages venv

echo Install PIP inside virtual environment
./venv/bin/easy_install pip

echo Installing dependencies to venv environment
virtualenv venv && env ARCHFLAGS="-arch x86_64" ./venv/bin/pip install -r ./build/pipreq.txt