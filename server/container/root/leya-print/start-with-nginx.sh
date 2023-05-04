#!/bin/bash
# https://docs.docker.com/config/containers/multi-service_container/

# Start nginx
nginx -g "daemon off;" &

# Start pdf service endpoint
cd ./server/pdf-service
node dist/server/pdf-service/src/launch.js &

# Start template service endpoint
cd ./server/tpl-service
node dist/server/tpl-service/src/launch.js &

# Wait for any process to exit
wait -n

# Exit with status of process that exited first
exit $?
