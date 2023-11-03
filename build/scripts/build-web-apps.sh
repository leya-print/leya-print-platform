#!/bin/bash
if [ ! $LB_WORKSPACE_ROOT ]; then
    source $(dirname $0)/env.sh
fi

source $LB_BUILD_SCRIPT_DIR/build-web-common.sh

# Build web apps
(. $LB_BUILD_SCRIPT_DIR/build-web-print.sh) & \
(. $LB_BUILD_SCRIPT_DIR/build-web-designer.sh) & \

wait