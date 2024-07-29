
# Detailed Startup Guide for Leya Print

This document provides detailed instructions on how to set up the Leya Print Platform locally. This setup allows you to run and develop the Leya Print services on your own machine. If you are looking for a faster way to start, you can use our [shortcuts](../README.md#getting-started) for VS Code or Gitpod.

## Prerequisites

Before you begin, make sure you have `npm` installed on your machine.

## Local Setup and Startup Instructions

### web/common
This module contains some shared logic between our web apps, implemented in 'web common' and packaged into a local npm package.

```bash
cd web/common

npm i
npm run build
npm pack

cd ../.. # Optionally, return to the root directory for the next steps
```

### web/print
This web app provides some border HTML to embed the templates.

> Requires web/common to be packed before!

Open a separate console (do not stop other servers) and run:
```bash
cd web/print
npm i
npm start
```

This should open a browser tab. If there are no errors, everything is set up correctly, and you can close the tab.

### server/common
This module contains some shared logic between our Node.js-based services, implemented in 'server common' and packaged into a local npm package.

```bash
cd server/common
npm i
npm run build
npm pack
cd ../.. # Optionally, return to the root directory for the next steps
```

### server/tpl-service (Template Management System)
This server stores/provides your uploaded templates. By default, templates are stored as subfolders of the [{project_root}/data](../data) folder, and their metadata is collected in [{project_root}/data/template-packages.json](../data/template-packages.json). Right after a fresh checkout, you can find some pre-deployed templates there.

> Requires server/common to be packed before!

Open a separate console (do not stop other servers) and run:
```bash
cd server/tpl-service

npm i

npm run dev:watch # Single thread dev server in watch mode
# or 'npm run dev' for a dev server without watch mode
# or 'npm start' for a forked multi process production server
```

Now you should be able to access the service.  
Try out the alive endpoint: `http://localhost:6001/tpl/alive` (you should see the text "Ok" and get a response code 200)

### server/pdf-service (Document Generator)
This server starts multiple Chromium instances to render the templates with provided data.

> Requires server/common to be packed before!

Open a separate console (do not stop other servers) and run:
```bash
cd server/pdf-service
npm i
npx playwright install chromium
npm run dev:watch # Single thread dev server in watch mode
# or 'npm run dev' for a dev server without watch mode
# or 'npm start' for a forked multi process production server
```

Now you should be able to access the service.  
Try out the alive endpoint: `curl localhost:6000/pdf/alive` (you should see the text "Ok" and get a response code 200). This alive endpoint will also check connections for the tpl-server and the print web app.

### web/designer (Remote Template Development Tool)
This tool helps you see a list of deployed templates, deploy new ones, and test templates with different payload data.

> Requires web/common to be packed before!

Open a separate console (do not stop other servers) and run:
```bash
cd web/designer
npm i
npm start
```

This should open a new browser tab that displays the web/designer tool.

### web/templates (Bundled Template Project)
Usually, you would not bundle the template project but host it in a separate repository. 
To make it easier to test everything, this is a small bundled template project.

In a separate console (without stopping other servers) run:
```bash
cd web/templates
npm i
npm start
```

This should open a blank browser tab without errors. After it has started up, you can use
the URL http://localhost:3333/build/index.esm.js to connect your templates from any
(not only your local) web/designer instance. This is the only server needed locally to
develop templates.