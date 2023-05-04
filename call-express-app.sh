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
# while ! nc -z ${DB_SERVER} ${DB_PORT}; do
#    sleep ${wait_time}
#    echo "Waiting ${wait_time} more secs for for postgres."
# done
sleep ${wait_time}
echo "...postgres ready at ${DB_SERVER} ${DB_PORT}."
echo ""

echo ""
echo "Waiting for api at ${API_SERVER} ${API_PORT}..."
wait_time=1
# while ! nc -z ${API_SERVER} ${API_PORT}; do
#    sleep ${wait_time}
#    echo "Waiting ${wait_time} more secs for for api."
# done
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
echo "--get current venues--"
curl -X GET http://localhost:3000/venues
echo ""

echo ""
echo "--get current venue 1--"
curl -X GET http://localhost:3000/venue/1
echo ""

echo ""
echo "--get current venue 2--"
curl -X GET http://localhost:3000/venue/2
echo ""

echo ""
echo "--add venue--"
curl -X POST --data "name=ABCD&capacity=2&address=123fakestreet&geolocation=50031158253165805914&image=123abc&email=fake@gmailcom&start_date=31122022&end_date=31122023" http://localhost:3000/venues
echo ""

echo ""
echo "--get current venues again--"
curl -X GET http://localhost:3000/venues
echo ""

echo ""
echo "--update venue 3--"
curl -X PUT -d "name=UPDATEDNAME789" -d "capacity=20000000" -d "address=newaddress" -d "geolocation=20000000" -d "image=20000000" -d "email=newmail@newmail.com" -d "start_date=20000000" -d "end_date=45678" http://localhost:3000/venue/3
echo ""

echo ""
echo "--get current venues again--"
curl -X GET http://localhost:3000/venues
echo ""

echo ""
echo "--delete venue 3--"
curl -X DELETE http://localhost:3000/venue/3
curl -X DELETE http://localhost:3000/venue/4
echo ""

echo ""
echo "--get current venues again--"
curl -X GET http://localhost:3000/venues
echo ""

echo ""
echo "... done"
echo ""
