#!/bin/bash
# https://docs.docker.com/config/containers/multi-service_container/

# Start nginx
nginx -g "daemon off;" &

# Start rest endpoint
cd ./server/rest
node dist/server/rest/src/launch.js &

# Wait for any process to exit
wait -n

# Exit with status of process that exited first
exit $?
