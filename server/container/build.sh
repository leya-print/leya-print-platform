!#/bin/bash
docker buildx build \
  --build-context server-rest=../rest \
  --build-context web-designer=../../web/designer \
  -t leya:local \
  .
