Leya Designer
=============
Leya Designer is a web-frontend to support the development of print templates.

Getting started
---------------
### in development mode
currently it is not needed to start anything else before

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

Technical description
---------------------
Leya Designer is a project based on stencil.

Stencil is a compiler for building fast web apps using Web Components.

Stencil combines the best concepts of the most popular frontend frameworks into a compile-time rather than run-time tool.  Stencil takes TypeScript, JSX, a tiny virtual DOM layer, efficient one-way data binding, an asynchronous rendering pipeline (similar to React Fiber), and lazy-loading out of the box, and generates 100% standards-based Web Components that run in any browser supporting the Custom Elements v1 spec.

Stencil components are just Web Components, so they work in any major framework or with no framework at all. In many cases, Stencil can be used as a drop in replacement for traditional frontend frameworks given the capabilities now available in the browser, though using it as such is certainly not required.

Stencil also enables a number of key capabilities on top of Web Components, in particular Server Side Rendering (SSR) without the need to run a headless browser, pre-rendering, and objects-as-properties (instead of just strings).