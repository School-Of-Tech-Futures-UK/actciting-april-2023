#!/bin/sh

###
### Script to connect into the postgres container
###

echo "Connecting to local postgres container..."

docker exec -it my-postgres su postgres
