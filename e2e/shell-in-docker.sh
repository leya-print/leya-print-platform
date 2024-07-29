#!/bin/bash

# LEYA_E2E_BASE_URL=https://leya-print-demo.azurewebsites.net/

# Run e2e specs
docker run \
    -v $(pwd):/e2e \
    -w /e2e \
    --rm \
    --name e2e \
    --env LEYA_E2E_BASE_URL=$LEYA_E2E_BASE_URL \
    --network host \
    -it \
    mcr.microsoft.com/playwright:v1.44.0-focal \
    bash
