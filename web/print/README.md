# Leya Print
=============
Leya Print is a frontend web solution to support the rendering of templates.

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
Leya Print is a project based on Stencil.js with the purpose of rendering templates in PDF format.

Stencil is a compiler for building fast web apps using Web Components.
For more information: https://stenciljs.com/

!!! Considerations: !!!

When rendering with the raster grid layout activated there will be a white margin on the left side of the page and some black lines will appear in the PDF.
This white margin and black lines are by design following the standard to easily fold, envelop and archive the physical document.

## Using Stencil components within Stencil
Print has integrated other Stencil components for use such as the watermark that can appear on templates.
The other common Stencil components are usually stored in the web/common solution.

To use them they need to be imported in the app root: src/components/app-root/app-root.tsx
    import '@leya-print/web-common/dist/components/leya-print-watermark'

There is no need to reference the components in src/app.ts

!!! Considerations: !!!

When adding new Stencil components in a Stencil component please make sure before hand all applications are stopped if not a error might appear when rebuilding the application saying that it expected a js module however it received a html page.
The error indicates the incorrect page is delievered because in the server nginx config file on error the server returns a index.html page and not a .js module.

## Contact
For further queries, contact us at info@leya-it-solutions.de.