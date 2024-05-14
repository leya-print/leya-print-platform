# Leya Designer
=============
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
Leya Designer is a project based on stencil.

Stencil is a compiler for building fast web apps using Web Components.

Stencil combines the best concepts of the most popular frontend frameworks into a compile-time rather than run-time tool.  Stencil takes TypeScript, JSX, a tiny virtual DOM layer, efficient one-way data binding, an asynchronous rendering pipeline (similar to React Fiber), and lazy-loading out of the box, and generates 100% standards-based Web Components that run in any browser supporting the Custom Elements v1 spec.

Stencil components are just Web Components, so they work in any major framework or with no framework at all. In many cases, Stencil can be used as a drop in replacement for traditional frontend frameworks given the capabilities now available in the browser, though using it as such is certainly not required.

Stencil also enables a number of key capabilities on top of Web Components, in particular Server Side Rendering (SSR) without the need to run a headless browser, pre-rendering, and objects-as-properties (instead of just strings).

## Using Stencil components within Stencil
The designer has integrated other Stencil components for use such as the watermark that can appear on templates.
The other common Stencil components are usually stored in the web/common solution.

To use them they need to be imported in the app root: src/components/app-root/app-root.tsx
    import '@leya-print/web-common/dist/components/leya-print-watermark'

There is no need to reference the components in src/app.ts

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