#!/bin/sh

###
### Script to rubuild everything and call the api-app container's urls
###

./docker compose-setup-all.sh

# exercise the api
./call-express-app.sh
