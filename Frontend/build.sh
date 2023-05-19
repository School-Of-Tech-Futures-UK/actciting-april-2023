#!/usr/bin/env bash

# See also https://stackoverflow.com/questions/2264428/how-to-convert-a-string-to-lower-case-in-bash - the bash4 version does not work on lots of macs

echo ""

sub_domain=actciting
export REACT_APP_BASE_ADDRESS=https://${sub_domain}.sot-apr-23.com
export REACT_APP_SERVER_ADDRESS=https://${sub_domain}.sot-apr-23.com/api


# export REACT_APP_SERVER_ADDRESS=https://${sub_domain}.infinityworks.academy/api
# export REACT_APP_FLYERS_ADDRESS=https://flyers-${sub_domain}.infinityworks.academy


echo "...REACT_APP_SERVER_ADDRESS=${REACT_APP_SERVER_ADDRESS}"
echo "...REACT_APP_SERVER_ADDRESS=${REACT_APP_VENUES}"

npm ci
npm run build





