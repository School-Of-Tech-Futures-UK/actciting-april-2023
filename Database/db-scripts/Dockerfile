FROM postgres:latest

COPY ./*.sql /docker-entrypoint-initdb.d/

# This fixes some issues on MAc vs Windows
RUN chmod a+r /docker-entrypoint-initdb.d/*.sql
