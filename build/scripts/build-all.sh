#!/bin/bash
set -e
. $(dirname $0)/env.sh

LB_BUILD_SCRIPT_DIR=$LB_WORKSPACE_ROOT/build/scripts

# Build web frontend and rest server in parallel
(. $LB_BUILD_SCRIPT_DIR/build-web-designer.sh) & \
(. $LB_BUILD_SCRIPT_DIR/build-web-print.sh) & \
(. $LB_BUILD_SCRIPT_DIR/build-pdf-service.sh) & \
(. $LB_BUILD_SCRIPT_DIR/build-tpl-service.sh) &

# Wait for both builds to complete
wait

# Build the Docker image with those results
. $LB_BUILD_SCRIPT_DIR/build-server-container.sh
