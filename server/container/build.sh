#!/bin/bash
docker buildx build \
  --build-context pdf-service=../pdf-service \
  --build-context tpl-service=../tpl-service \
  --build-context web-designer=../../web/designer \
  --build-context web-print=../../web/print \
  -t leya:local \
  .
