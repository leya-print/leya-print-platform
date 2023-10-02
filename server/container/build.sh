#!/bin/bash
docker buildx build \
  --build-context server-common=../common \
  --build-context pdf-service=../pdf-service \
  --build-context tpl-service=../tpl-service \
  --build-context auth-service=../auth-service \
  \
  --build-context web-common=../../web/common \
  --build-context web-designer=../../web/designer \
  --build-context web-print=../../web/print \
  -t local.local/leya \
  .