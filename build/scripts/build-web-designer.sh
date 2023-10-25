#!/bin/bash
if [ ! $LB_WORKSPACE_ROOT ]; then
    source $(dirname $0)/env.sh
fi

cd $LB_WORKSPACE_ROOT/web/designer
npm run remove-integrity
npm ci
npm run build
