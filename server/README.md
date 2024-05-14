# Server Projects
This document provides an excerpt from the comprehensive project structure of the Leya Print Platform,
focusing specifically on the server components. For an overview of the entire project structure,
including web applications and utility scripts, please refer to the
[main project structure documentation](../docs/project-structure.md) or the [main README](../README.md).

## Server-Side Applications

- **server/api:** Contains the OpenAPI definition for all services.
  [View API Documentation](../server/api/openapi-rest.yml)
- **server/common:** Shared server-side logic and utilities.
  [Read more](../server/common/README.md)
- **server/pdf-service:** The core document generation service using Chromium instances to render PDFs.
  [Read more](../server/pdf-service/README.md)
- **server/tpl-service:** Manages template storage and retrieval.
  [Read more](../server/tpl-service/README.md)
- **server/auth-service:** Handles authentication and access control.
  [Read more](../server/auth-service/README.md)

## Containerization

- **server/container:** This directory contains the necessary configurations for running Leya Print
  within a Docker container using NGINX. It plays a critical role in simplifying the deployment
  process by encapsulating the platform into a containerized environment, making it easy to deploy
  across different systems and cloud platforms.
  [Read more](../server/container/README.md)
