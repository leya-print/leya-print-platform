#!/bin/bash
if [ ! $LB_WORKSPACE_ROOT ]; then
    . "$(dirname $0)/env.sh"
fi

cd $LB_WORKSPACE_ROOT/common/api
npm ci
npm run build