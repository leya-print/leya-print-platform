#!/usr/bin/bash

function startBackend {
    source ./start-backend.sh
}

function startDesigner {
    source ./start-designer.sh
}

startBackend & startDesigner & echo "all are starting up"
