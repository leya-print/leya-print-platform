# LitElement Templates

This project has the purpose of showcasing how to use litElement to create templates for Leya.
Sample components using LitElement with TypeScript can be found in the /src/lit-templates folder.
The .scss files are not used, the files are there to show how the manual css from each component can be translated from css.

This template is generated from the `lit-starter-ts` package in [the main Lit
repo](https://github.com/lit/lit). Issues and PRs for this template should be filed in that repo.

## About this release

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

To watch files and rebuild when the files are modified, run the following command in a separate shell:

```bash
npm run build:watch
```

Both the TypeScript compiler and lit-analyzer are configured to be very strict. You may want to change `tsconfig.json` to make them less strict.
The project uses Rollup to crate the project distributables.

Two components are build:
`index.ts` and `lit-templates.ts` with the format .esm.js. The index file is used to export the templates package definitions, the lit-templates files are the content of the templates.
In the /src folder a component called lit-templates.ts can be found, all usable components must be inserted in this component, lit-templates.ts is the root.

When Leya links to the template solution, it can use the index.esm.js to retrieve information on what templates are available and the lit-templates.esm.js file to get the templates data.

## Project Structure

/dev/ -> index.html - folder that holds start html file when serving the project locally using in development environment, this file is used for testing, add components here to be rendered on serve.
index.html -> html file server for running in production environment.
.eslinttrc.json -> lint configuration.
.prettierrc.json -> prettier configuration.
rollup.config.js -> file to setup configuration for building project.
web-dev-server.config.js -> file to setup configuration for building web server.

/src/ ->
    lit-templates -> folder to hold templates
    models -> models used in components
    index.ts -> file that has template-package information.
    lit-templates.ts -> root component that should hold all template components.
    my-element-index.ts -> test component element, use for reference has no other use.
    template-package.const.ts -> file to setup templates package that will be available for use when linked to Leya.

## Testing

This sample uses modern-web.dev's
[@web/test-runner](https://www.npmjs.com/package/@web/test-runner) for testing. See the
[modern-web.dev testing documentation](https://modern-web.dev/docs/test-runner/overview) for
more information.

Tests can be run with the `test` script, which will run your tests against Lit's development mode (with more verbose errors) as well as against Lit's production mode:

```bash
npm test
```

For local testing during development, the `test:dev:watch` command will run your tests in Lit's development mode (with verbose errors) on every change to your source files:

```bash
npm test:watch
```

Alternatively the `test:prod` and `test:prod:watch` commands will run your tests in Lit's production mode.

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

## Linting

Linting of TypeScript files is provided by [ESLint](eslint.org) and [TypeScript ESLint](https://github.com/typescript-eslint/typescript-eslint). In addition, [lit-analyzer](https://www.npmjs.com/package/lit-analyzer) is used to type-check and lint lit-html templates with the same engine and rules as lit-plugin.

The rules are mostly the recommended rules from each project, but some have been turned off to make LitElement usage easier. The recommended rules are pretty strict, so you may want to relax them by editing `.eslintrc.json` and `tsconfig.json`.

To lint the project run:

```bash
npm run lint
```

## Formatting

[Prettier](https://prettier.io/) is used for code formatting. It has been pre-configured according to the Lit's style. You can change this in `.prettierrc.json`.

Prettier has not been configured to run when committing files, but this can be added with Husky and `pretty-quick`. See the [prettier.io](https://prettier.io/) site for instructions.

**Note**: The project uses Rollup to bundle and minify the source code for the docs site and not to publish to NPM. For bundling and minification, check the [Bundling and minification](#bundling-and-minification) section.

## Bundling and minification

As stated in the [static site generation](#static-site) section, the bundling and minification setup in the Rollup configuration in this project is there specifically for the docs generation.

We recommend publishing components as unoptimized JavaScript modules and performing build-time optimizations at the application level. This gives build tools the best chance to deduplicate code, remove dead code, and so on.

Please check the [Publishing best practices](https://lit.dev/docs/tools/publishing/#publishing-best-practices) for information on publishing reusable Web Components, and [Build for production](https://lit.dev/docs/tools/production/) for building application projects that include LitElement components, on the Lit site.

## More information

See [Get started](https://lit.dev/docs/getting-started/) on the Lit site for more information.