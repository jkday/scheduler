#!/usr/bin/env bash

echo "Starting Car Appt App!!!"
mongod --dbpath=/data/db --port 27017 --bind_ip_all &
sleep 1m #give mongo a chance to start up
node ./bin/www