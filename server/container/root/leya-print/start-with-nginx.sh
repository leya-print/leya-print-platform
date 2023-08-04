#!/bin/bash
# https://docs.docker.com/config/containers/multi-service_container/

# Start nginx
nginx -g "daemon off;" &

# Start pdf service endpoint
#!/bin/bash
cd server/pdf-service
node dist/launch.js &

# Start template service endpoint
cd ../../server/tpl-service
node dist/aunch.js &

# Start auth service endpoint
cd ../../server/auth-service
node dist/launch.js &

# Wait for any process to exit
wait -n

# Exit with status of process that exited first
exit $?
