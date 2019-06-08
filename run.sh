#!/usr/bin/env bash

echo "Starting Car Appointment App!!!"
mongod --dbpath=/data/db --port 27017 --bind_ip_all &
sleep 15s #give mongo a chance to start up
node ./bin/www  #starts the webapp
