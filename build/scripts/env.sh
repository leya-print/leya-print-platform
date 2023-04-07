#!/bin/bash
FILE_IN_WORKSPACE_ROOT='.gitpod.yml'

if [ ! $LB_WORKSPACE_ROOT ]; then
  set -e

  function getWorkspaceRoot {
    if [ -f $FILE_IN_WORKSPACE_ROOT ]; then
      export LB_WORKSPACE_ROOT=`pwd`
    else
      if [ `pwd` == '/' ]; then
        echo "Error: workspace root not found"
        exit 1
      else
        cd ..
        getWorkspaceRoot
      fi
    fi
  }

  DIR_BEFORE_SEARCH=`pwd`

  getWorkspaceRoot

  cd $DIR_BEFORE_SEARCH

  echo workspace root: $LB_WORKSPACE_ROOT
fi

