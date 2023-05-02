#!/bin/sh

###
### Script to rebuild just the api-app and call the container's urls
###

# remove the old containers, if any
docker compose stop api-app
docker compose rm -f api-app

# build and run the containers
docker compose up --build -d api-app

# see whats up
docker ps -a

# check the api-app
./call-express-app.sh
