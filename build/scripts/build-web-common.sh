#!/bin/bash
if [ ! $LB_WORKSPACE_ROOT ]; then
    . "$(dirname $0)/env.sh"
fi

cd $LB_WORKSPACE_ROOT/web/common
npm ci
npm run build
npm pack

TARBALL_PATH="$LB_WORKSPACE_ROOT/web/common/leya-print-web-common-1.0.0.tgz"

if [ ! -f "$TARBALL_PATH" ]; then
    echo "Tarball file does not exist: $TARBALL_PATH"
    exit 1
fi

tar -tzf "$TARBALL_PATH"
if [ $? -ne 0 ]; then
    echo "Tarball file is corrupted: $TARBALL_PATH"
    exit 1
fi