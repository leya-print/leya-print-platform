# Leya Designer
Leya Designer is a web-frontend solution to support the development of print templates.

## Table of Contents
- [Getting Started](#getting-started)
- [Technical description](#technical-description)
- [Using Stencil components within Stencil](#using-stencil-components-within-stencil)
- [Contact](#contact)

## Getting Started
Currently it is not needed to start anything else before

```sh
npm i
npm start
```
open browser at the printed address (usually [http://localhost:3333]())

To build the app for production, run:

```sh
npm run build
```

To run the unit tests once, run:

```sh
npm test
```

To run the unit tests and watch for file changes during development, run:

```sh
npm run test.watch
```

## Technical description
---------------------
Leya Designer is a project based on Stencil.js with the express purpose of aiding in the creation of templates.

Stencil is a compiler for building fast web apps using Web Components.
For more information: https://stenciljs.com/

Features:

The main feature of the Designer is the Previewer that provides and easy way of updating any template and applying a watermark and a raster layout.

In Preview screen:
    Watermark: A Watermark can be applied by typing in the text that would be included and refreshing the page or the Preview button.
    Raster: The raster can be activated via the raster checkbox, to see the changes in the Designer after checking the box the page can be refreshed and the template will be updated or click on the Preview button.

## Using Stencil components within Stencil
The Designer has integrated other Stencil components for use such as the watermark that can appear on templates.
The other common Stencil components are usually stored in the web/common solution.

To use them they need to be imported in the app root: src/components/app-root/app-root.tsx
    import '@leya-print/web-common/dist/components/leya-print-watermark'

There is no need to reference the components in src/app.ts

!!! Considerations: !!!

When adding new Stencil components in a Stencil component please make sure before hand all applications are stopped if not a error might appear when rebuilding the application saying that it expected a js module however it received a html page.
The error indicates the incorrect page is delievered because in the server nginx config file on error the server returns a index.html page and not a .js module.

## Use live templates and modify a invoice template

To use the live templates and modify a template the first step is to go to the Designer UI.
From the designer UI, a user might want to use the "live templates", first we need to pass a link to some templates.
Default templates can be found in the Templates project, use the link https://3333-{LOCAL-URL}/build/index.esm.js, replace the LOCAL-URL with the gitpod url or local system url.
Press the button next to the URL textbox to display the templates.
Click on the "invoice" template from the "live templates" category.
From the upper-right box the json data will be modified to the user's needs.
When done the preview button will be clicked and the pdf is generated.

## Contact
For further queries, contact us at info@leya-it-solutions.de.