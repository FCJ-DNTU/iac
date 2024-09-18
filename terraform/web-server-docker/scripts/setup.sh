#!/bin/bash

# This script will setup your docker image
imageName=web-server-image

# Build image
docker build ./src -t $imageName