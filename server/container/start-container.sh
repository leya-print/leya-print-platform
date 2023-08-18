#!/bin/bash
PWD=`pwd`
CONTAINER_NAME=leya-local

# node update-env.js // try to use gitpod as dynamic template src

docker run \
  --name leya-local \
  -p 8082:8080 \
  --mount type=bind,source=$PWD/../../data,target=/leya-print/data \
  --rm \
  -it \
  local.local/leya
