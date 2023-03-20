#!/bin/bash
set -e

. $(dirname $0)/env.sh

cd $LB_WORKSPACE_ROOT/web/designer
npm ci
npm run build