# Lit Element Templates

This project has the purpose of showcasing how to use LitElement to create templates for Leya.
Sample components using LitElement with TypeScript can be found in the /src/templates-lit folder.

This template is generated from the `lit-starter-ts` package in [the main Lit
repo](https://github.com/lit/lit). Issues and PRs for this template should be filed in that repo.
The repo codebase has a number of improvements that could be used to create a more robust solution which are not present in this example solution, this example is kept on purpose to be a minimal example.
Some of the extra features available in repo are Linting, Formatting, Analyzer, environment handeling and more.
If any of the feature are needed please check the repo mentioned above.

## About this version of Lit release

This is a pre-release of Lit 3.0, the next major version of Lit.
Lit 3.0 has very few breaking changes from Lit 2.0:

- Drops support for IE11
- Published as ES2021
- Removes a couple of deprecated Lit 1.x APIs

Lit 3.0 should require no changes to upgrade from Lit 2.0 for the vast majority of users. Once the full release is published, most apps and libraries will be able to extend their npm version ranges to include both 2.x and 3.x, like `"^2.7.0 || ^3.0.0"`.

Lit 2.x and 3.0 are _interoperable_: templates, base classes, directives, decorators, etc., from one version of Lit will work with those from another.

Please file any issues you find on our [issue tracker](https://github.com/lit/lit/issues).

## Setup

Install dependencies:

```bash
npm i
```

## Build

This project uses the TypeScript compiler to produce JavaScript that runs in modern browsers.
To build the JavaScript version of your component:

```bash
npm run build
```

Both the TypeScript compiler and lit-analyzer are configured to be very strict. You may want to change `tsconfig.json` to make them less strict.
The project uses Rollup to create the project distributables.

Two components are build:
`index.ts` and `lit-templates.ts` with the format .esm.js. The index file is used to export the templates package definitions, the lit-templates files are the content of the templates.
In the /src folder a component called lit-templates.ts can be found, all usable components must be inserted in this component, lit-templates.ts is the root.

When Leya links to the template solution, it can use the index.esm.js to retrieve information on what templates are available and the lit-templates.esm.js file to get the templates data.

## Project Structure

index.html - the start html file when serving the project locally using in development environment, this file is used for testing, add components here to be rendered on serve.

The best practice would be to link the template as soon as possible with LEYA because LEYA has a few styling rules that might override the template's styles creating differences between the local and LEYA environment.
Please use the index.html only to start and orient a little before linking to LEYA.

rollup.config.js -> file to setup configuration for building project.
web-dev-server.config.js -> file to setup configuration for building web server.

The .scss files are not used, the files are there to show how the manual css from each component can be translated from css.

/src/ ->
    lit-templates -> folder to hold templates
    models -> models used in components
    index.ts -> file that has template-package information.
    lit-templates.ts -> root component that should hold all template components.
    my-element-index.ts -> test component element, use for reference has no other use.
    template-package.const.ts -> file to setup templates package that will be available for use when linked to Leya.

## Dev Server

This sample uses modern-web.dev's [@web/dev-server](https://www.npmjs.com/package/@web/dev-server) for previewing the project without additional build steps. Web Dev Server handles resolving Node-style "bare" import specifiers, which aren't supported in browsers. It also automatically transpiles JavaScript and adds polyfills to support older browsers. See [modern-web.dev's Web Dev Server documentation](https://modern-web.dev/docs/dev-server/overview/) for more information.

To run the dev server and open the project in a new browser tab:

```bash
npm run serve
```

There is a development HTML file located at `/dev/index.html` that you can view at http://localhost:8000/dev/index.html. Note that this command will serve your code using Lit's development mode (with more verbose errors). To serve your code against Lit's production mode, use `npm run serve:prod`.

## CORS

To setup CORS for the web-server, update the web-dev-server.config.js file, we added a middleware to pass allowed origins, for this test everything is allowed.

  middleware: [
    async (context, next) => {      
      context.set('Access-Control-Allow-Origin', '*');            
      
      await next();
    },
  ],


## Editing

If you use VS Code, we highly recommend the [lit-plugin extension](https://marketplace.visualstudio.com/items?itemName=runem.lit-plugin), which enables some extremely useful features for lit-html templates:

- Syntax highlighting
- Type-checking
- Code completion
- Hover-over docs
- Jump to definition
- Linting
- Quick Fixes

The project is setup to recommend lit-plugin to VS Code users if they don't already have it installed.

## Bundling and minification

When running the task "npm run build" both building using the typescript compiler and the bundling will be done.

``

  "build": "tsc; rollup -c",

``

rollup.config.js file contains the configuration for bundling.
Two files are used as input for bundling: 'src/index.ts' and 'src/lit-templates.ts'.
The Index file is used by Leya to link the templates and to read the templates available.
The Templates file is used to create the proper templates themselves into a format that Leya can read and store on upload.

For more info on how to use the templates please check the CREATE-TEMPLATE-GUIDE.md

We recommend publishing components as unoptimized JavaScript modules and performing build-time optimizations at the application level. This gives build tools the best chance to deduplicate code, remove dead code, and so on.

Please check the [Publishing best practices](https://lit.dev/docs/tools/publishing/#publishing-best-practices) for information on publishing reusable Web Components, and [Build for production](https://lit.dev/docs/tools/production/) for building application projects that include LitElement components, on the Lit site.

## More information

See [Get started](https://lit.dev/docs/getting-started/) on the Lit site for more information.