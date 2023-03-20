#!/bin/bash

if [ ! $LB_WORKSPACE_ROOT ]; then
    DIR_BEFORE_SEARCH=`pwd`

    cd $(dirname $0)/../..

    FILE_IN_WORKSPACE_ROOT='.gitpod.yml'
    export LB_WORKSPACE_ROOT=`pwd`

    cd $DIR_BEFORE_SEARCH

    echo workspace root: $LB_WORKSPACE_ROOT
fi