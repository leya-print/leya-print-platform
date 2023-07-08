#!/bin/bash
if [ ! $LB_WORKSPACE_ROOT ]; then
    source $(dirname $0)/env.sh
fi

cd $LB_WORKSPACE_ROOT/server/auth-service
npm ci
npm i ../../common/api/leya-print-common-api-1.0.0.tgz
npm run build