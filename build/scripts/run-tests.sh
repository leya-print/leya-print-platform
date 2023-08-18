#!/bin/bash
if [ ! $LB_WORKSPACE_ROOT ]; then
    source $(dirname $0)/env.sh
fi

cd $LB_WORKSPACE_ROOT/e2e/
docker-compose run e2e-test