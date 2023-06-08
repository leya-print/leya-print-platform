#!/bin/bash
docker buildx build \
  --build-context server-rest=../rest \
  --build-context web-designer=../../web/designer \
  --build-context web-print=../../web/print \
  -t leya:local \
  .
