#!/bin/bash

# This script will setup your docker image
clientImageName="client-app-image"
serverImageName="server-app-image"
databaseImageName="server-database-image"

# Build image
docker build ./client -t $clientImageName
docker build ./server -t $serverImageName
docker build ./database -t $databaseImageName