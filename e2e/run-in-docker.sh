#!/bin/bash

# BASE_URL=https://leya-print-demo.azurewebsites.net/

# Run e2e specs
docker run \
    -v $(pwd):/e2e \
    -w /e2e \
    --rm \
    --name e2e \
    --env BASE_URL=$BASE_URL \
    --network host \
    -it \
    mcr.microsoft.com/playwright:v1.37.0-jammy \
    bash start-xvfb.sh
