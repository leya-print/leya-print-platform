#!/bin/bash
if [ -z LB_WORKSPACE_ROOT ]; then
    . $(dirname $0)/env.sh
fi

cd $LB_WORKSPACE_ROOT/server/rest
npm ci
npm run build