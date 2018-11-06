#!/bin/bash
set -euo pipefail

# -----------------------------------------
# readme
# -----------------------------------------

# copy README & images from the root of the repo
cp -f ../../README.md .
rm -fr images
cp -r ../../images .

# -----------------------------------------
# lambda bundle
# -----------------------------------------

# find poller package root
source="$(node -e "console.log(path.dirname(require.resolve('cdk-tweet-queue-poller/package.json')))")"
dest="$PWD/lambda"

# use "npm pack" to prepare the tarball (including bundled deps)
cd ${source}
tarball="${source}/$(npm pack)"

# untar into "./lambda"
rm -fr ${dest}
mkdir -p ${dest}
cd ${dest}
tar --strip-components=1 -xzvf ${tarball}

# clean up tarball
rm ${tarball}
