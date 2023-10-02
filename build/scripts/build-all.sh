#!/bin/bash
set -e
. $(dirname $0)/env.sh

(. $LB_BUILD_SCRIPT_DIR/build-service-endpoints.sh) & \
(. $LB_BUILD_SCRIPT_DIR/build-web-apps.sh) & \

# Wait for all builds to complete
wait

# Build the Docker image with those results
. $LB_BUILD_SCRIPT_DIR/build-server-container.sh
