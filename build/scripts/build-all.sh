#!/bin/bash
set -e
. $(dirname $0)/env.sh

LB_BUILD_SCRIPT_DIR=$LB_WORKSPACE_ROOT/build/scripts
. $LB_BUILD_SCRIPT_DIR/build-web-designer.sh
. $LB_BUILD_SCRIPT_DIR/build-server-rest.sh
. $LB_BUILD_SCRIPT_DIR/build-server-container.sh
