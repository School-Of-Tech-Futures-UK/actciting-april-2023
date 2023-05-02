# This file is a pre-cooked sample for the Docker session

# This uses a blank Alpine as an example, 
# so without Node pre-istalled we don't use a WORKDIR
# as Node & NPM aren't globally visible

FROM alpine:latest

RUN apk add --update nodejs npm

# Use absolute paths
RUN mkdir /app
COPY * /app/
RUN cd /app && npm install

EXPOSE 3000

# Use absolute path
ENTRYPOINT ["npm", "run", "--prefix=app", "start"]
