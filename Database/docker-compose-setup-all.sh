#!/bin/sh

###
### Script to rubuild the db, db-helper and api app
###

# remove container from earlier in the session
set +e
docker stop my-postgres
docker rm my-postgres
set -e

# remove the old containers, if any
docker-compose down

# build and run the containers
docker-compose up --build -d

# see whats up
docker ps -a
