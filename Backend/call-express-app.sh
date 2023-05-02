#!/bin/sh

###
### Script to call the api-app container's urls
###

DB_SERVER=localhost
DB_PORT=5432
API_SERVER=localhost
API_PORT=3000

echo ""
echo "Waiting for postgres at ${DB_SERVER} ${DB_PORT}..."
wait_time=1
while ! nc -z ${DB_SERVER} ${DB_PORT}; do
   sleep ${wait_time}
   echo "Waiting ${wait_time} more secs for for postgres."
done
sleep ${wait_time}
echo "...postgres ready at ${DB_SERVER} ${DB_PORT}."
echo ""

echo ""
echo "Waiting for api at ${API_SERVER} ${API_PORT}..."
wait_time=1
while ! nc -z ${API_SERVER} ${API_PORT}; do
   sleep ${wait_time}
   echo "Waiting ${wait_time} more secs for for api."
done
sleep ${wait_time}
echo "...api ready at ${API_SERVER} ${API_PORT}."
echo ""

echo ""
echo "Calling CRUD api....."

echo ""
echo "--call homepage--"
curl -X GET http://localhost:3000/
echo ""

echo ""
echo "--get current teachers--"
curl -X GET http://localhost:3000/teachers
echo ""

echo ""
echo "--get current teacher 1--"
curl -X GET http://localhost:3000/teachers/1
echo ""

echo ""
echo "--get current teacher 2--"
curl -X GET http://localhost:3000/teachers/2
echo ""

echo ""
echo "--add teacher--"
curl -X POST --data "first_name=Michael&surname=Woodhead" http://localhost:3000/teachers
echo ""

echo ""
echo "--get current teachers again--"
curl -X GET http://localhost:3000/teachers
echo ""

echo ""
echo "--update teacher 3--"
curl -X PUT -d "first_name=Michael" -d "surname=The-Boss"  http://localhost:3000/teachers/3
echo ""

echo ""
echo "--get current teachers again--"
curl -X GET http://localhost:3000/teachers
echo ""

echo ""
echo "--delete teacher 3--"
curl -X DELETE http://localhost:3000/teachers/3
echo ""

echo ""
echo "--get current teachers again--"
curl -X GET http://localhost:3000/teachers
echo ""

echo ""
echo "... done"
echo ""
