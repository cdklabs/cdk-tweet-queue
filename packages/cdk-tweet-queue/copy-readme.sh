#!/bin/bash
set -euo pipefail
cp -f ../../README.md .
rm -fr images
cp -r ../../images .
