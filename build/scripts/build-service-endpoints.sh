#!/bin/bash
if [ ! $LB_WORKSPACE_ROOT ]; then
    source $(dirname $0)/env.sh
fi

source $LB_BUILD_SCRIPT_DIR/build-server-common.sh

# Build service endpoints
(. $LB_BUILD_SCRIPT_DIR/build-auth-service.sh) & \
(. $LB_BUILD_SCRIPT_DIR/build-pdf-service.sh) & \
(. $LB_BUILD_SCRIPT_DIR/build-tpl-service.sh) & \

wait