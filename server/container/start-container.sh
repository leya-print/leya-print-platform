#!/bin/bash
PWD=`pwd`
CONTAINER_NAME=leya-local

node update-env.js

# if [ container exists ]
if [ "$(docker ps -aq -f name=$CONTAINER_NAME)" ]; then
    # if [ container is running ]
    if [ "$(docker ps -a -q -f name=$CONTAINER_NAME -f status=running)" ]; then
        docker kill $CONTAINER_NAME
    fi

    docker rm $CONTAINER_NAME
fi

docker run \
  --detach \
  --name leya-local \
  -p 8082:8080 -p 8083:8091 -p 8084:8090 \
  --mount type=bind,source=$PWD/../../data,target=/leya-print/data \
  leya:local

docker logs -f leya-local
