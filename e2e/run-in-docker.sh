#!/bin/bash

# Run e2e specs
docker run -v $(pwd):/test -w /test --rm --name e2e -it mcr.microsoft.com/playwright:v1.37.0-jammy bash start-xvfb.sh
