<!-- PROJECT HEADER -->
<br />
<div align="center">
    <h3 align="center">Template Guide</h3>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li><a href="#about-the-guide">About the guide</a></li>
    <li><a href="#lit">Lit</a></li>
    <li><a href="#getting-started">Getting Started</a></li>
    <li><a href="#lit-project-structure">Lit Project Structure</a></li>
    <li><a href="#create-components">Create template</a></li>
    <li><a href="#design-components">Design template</a></li>
    <li><a href="#link-to-designer">Link to Designer</a></li>
    <li><a href="#best-practices">Best practices</a></li>
    <li><a href="#license">License</a></li>
  </ol>
</details>

<!-- ABOUT THE GUIDE -->
## About The Guide

This guide's purpose is to provide a easy step-by-step way to create a template for the Leya Print System using Lit. The guide includes instructions on how to setup a template project, setup all necessary parts to interact with Leya, create/edit/extend the components and building the project.

More resources such as Starter Templates, Tutorials, Extensions, Tools and many more can be found at the following repo: https://github.com/web-padawan/awesome-lit

<!-- LIT -->

## Lit

We will use the Lit library to create the template for this guide. 
Lit is a simple library for building fast, lightweight web components.
At Lit's core is a boilerplate-killing component base class that provides reactive state, scoped styles, and a declarative template system that's tiny, fast and expressive.

More information related to the library can be found at: https://lit.dev/


<!-- GETTING STARTED -->

## Getting Started

There are two options on getting started, the first one is to use a starter-kit and the second one is to create from scratch a new project.
Firstly with a starter kit most essentials packages are already added and a structure is provided, some kits can be found at the repo from the ## About this Guide section while more standard ones can be found in the Official Lit Documentation: https://lit.dev/docs/tools/starter-kits/

In this guide we will start from scratch by creating a project, adding lit and so forth.

1st Step:
Create an empty project folder, the name is irelevant.

2nd Step:
We need node modules and packages to start.
Open or go to a terminal and use the command `npm init` or `yard init` this will generate the files package.json, package-lock.json and node_modules folder.
We need to add some configuration files, however first we need to update the package file with our script commands and packages that we will use to develop our workflow:

Copy the script from below into the package.json file and run `npm i`.
Fields such as name, version, description, etc can be modified per project as required.

``
{
    "name": "example-templates",
    "private": true,
    "version": "2.0.0",
    "description": "templates made with lit elements",
    "main": "dist/index.cjs",
    "module": "dist/index.esm.js",
    "type": "module",
    "es2015": "dist/esm/index.esm.js",
    "es2017": "dist/esm/index.esm.js",
    "scripts": {
      "build": "tsc",
      "build:watch": "tsc --watch",
      "lint": "npm run lint:lit-analyzer && npm run lint:eslint",
      "lint:eslint": "eslint 'src/**/*.ts'",
      "lint:lit-analyzer": "lit-analyzer",
      "format": "prettier \"**/*.{cjs,html,js,json,md,ts}\" --ignore-path ./.eslintignore --write",
      "analyze": "cem analyze --litelement --globs \"src/**/*.ts\"",
      "analyze:watch": "cem analyze --litelement --globs \"src/**/*.ts\" --watch",
      "serve": "wds --watch",
      "start": "wds --dev --watch --serve --port 3335",
      "serve:prod": "MODE=prod npm run serve",
      "rollup": "rollup -c ;",
      "clean": "rimraf my-element.{d.ts,d.ts.map,js,js.map} test/my-element.{d.ts,d.ts.map,js,js.map} test/my-element_test.{d.ts,d.ts.map,js,js.map}",
      "checksize": "rollup -c ; cat my-element.bundled.js | gzip -9 | wc -c ; rm my-element.bundled.js"
    },
    "keywords": [
      "web-components",
      "lit-element",
      "typescript",
      "lit"
    ],
    "author": "Leya",
    "license": "Apache",
    "dependencies": {
      "@leya-print/template-api": "^0.0.2",
      "lit": "^3.1.2"
    },
    "devDependencies": {
      "@11ty/eleventy": "^1.0.1",
      "@11ty/eleventy-plugin-syntaxhighlight": "^4.0.0",
      "@custom-elements-manifest/analyzer": "^0.6.3",
      "@open-wc/testing": "^3.1.5",
      "@rollup/plugin-commonjs": "^25.0.7",
      "@rollup/plugin-node-resolve": "^13.3.0",
      "@rollup/plugin-replace": "^5.0.2",
      "@rollup/plugin-typescript": "^11.1.5",
      "@typescript-eslint/eslint-plugin": "^5.25.0",
      "@typescript-eslint/parser": "^5.25.0",
      "@web/dev-server": "^0.1.31",
      "@web/dev-server-legacy": "^1.0.0",
      "@web/test-runner": "^0.15.0",
      "@web/test-runner-playwright": "^0.9.0",
      "@webcomponents/webcomponentsjs": "^2.8.0",
      "eslint": "^8.15.0",
      "lit-analyzer": "^1.2.1",
      "prettier": "^2.6.2",
      "rimraf": "^3.0.2",
      "rollup": "^2.79.1",
      "rollup-plugin-summary": "^1.4.3",
      "rollup-plugin-terser": "^7.0.2",
      "typescript": "~5.2.0"
    },
    "customElements": "custom-elements.json"
  }
``

The "dependencies" section contains only lit and our very own template-api from Leya which provides types and interfaces for our template definition.
We will use this dependency later.
    
  `` 
  "@leya-print/template-api": "^0.0.2"
  "lit": "^3.1.2" 
  ``

The "devDependencies" section in a package.json file lists packages that are only needed for development purposes. These packages are not required for the production runtime of the application but are essential during development, such as testing, linting, and building: 

Eleventy: Static site generator for building websites.
Custom Elements Manifest Analyzer: Analyzes Custom Elements usage in a project.
Rollup Plugins: Various plugins for Rollup, a module bundler.
TypeScript ESLint: ESLint plugin and parser for TypeScript.
Web Dev Server: Development server optimized for web development.

The scripts section of the file provides some usefull commands during the development of the templates.

``
  "scripts": {
    "build": "tsc",
    "build:watch": "tsc --watch",
    "lint": "npm run lint:lit-analyzer && npm run lint:eslint",
    "lint:eslint": "eslint 'src/**/*.ts'",
    "lint:lit-analyzer": "lit-analyzer",
    "format": "prettier \"**/*.{cjs,html,js,json,md,ts}\" --ignore-path ./.eslintignore --write",
    "analyze": "cem analyze --litelement --globs \"src/**/*.ts\"",
    "analyze:watch": "cem analyze --litelement --globs \"src/**/*.ts\" --watch",
    "serve": "wds --watch",
    "start": "wds --dev --watch --serve --port 3335",
    "serve:prod": "MODE=prod npm run serve",
    "rollup": "rollup -c ;"
  },
``

build: Runs the TypeScript compiler (tsc) to build the project.
build:watch: Runs the TypeScript compiler (tsc) in watch mode to continuously build the project.
lint: Runs linting using both Lit Analyzer and ESLint for TypeScript files.
lint:eslint: Runs ESLint for TypeScript files located in the src directory.
lint:lit-analyzer: Runs Lit Analyzer for TypeScript files.
format: Formats specified file types using Prettier with custom ignore rules.
analyze: Analyzes TypeScript files using Custom Elements Manifest Analyzer.
analyze:watch: Analyzes TypeScript files in watch mode using Custom Elements Manifest Analyzer.
serve: Starts the web dev server (wds) in watch mode.
start: Starts the development web server with hot reloading and on port 3335.
serve:prod: Sets the environment to production and starts the production server.
rollup: Executes Rollup to bundle files using the default configuration file.
clean: Deletes specified TypeScript declaration, JavaScript, and source map files associated with the "my-element" component and its tests.
checksize: Builds the project using Rollup, then calculates the compressed size of the generated JavaScript bundle file for the "my-element" component, and finally removes the bundle file.

The main and module sections of the file are very important, this paths are used by Leya as a entry point to this template's components. Instructions on how we configure them correctly later.

"main": "dist/index.cjs",
"module": "dist/index.esm.js",

3rd Step:
Configuration files for our devDependencies packages should be created, we create the following files (files like tsconfig.json, rollup.config.js can be generated from the command line with npm init rollup, tsc --init however we can just create them manually as well).

Create the following files in root of the project and paste the content:

tsconfig.json

{
  "compilerOptions": {
    "target": "es2021",
    "module": "es2020",
    "lib": ["es2021", "DOM", "DOM.Iterable"],
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true,
    "inlineSources": true,
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "noImplicitAny": true,
    "noImplicitThis": true,
    "moduleResolution": "node",
    "allowSyntheticDefaultImports": true,
    "experimentalDecorators": true,
    "forceConsistentCasingInFileNames": true,
    "noImplicitOverride": true,
    "plugins": [
      {
        "name": "ts-lit-plugin",
        "strict": true
      }
    ],
    "types": ["mocha"]
  },
  "include": ["src/**/*.ts", "src/my-element-index.ts"],
  "exclude": []
}

rollup.config.js

import summary from 'rollup-plugin-summary';
import resolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import typescript from '@rollup/plugin-typescript';

export default [
  {
    input: 'src/index.ts',
    output: [{
      file: 'dist/index.esm.js',
      format: 'esm',
      sourcemap: true,
    },
    {
      file: 'dist/index.cjs',
      format: 'cjs',
      sourcemap: true,
    },
    {
      file: 'dist/esm/index.js',
      sourcemap: true,
    },
    {
      file: 'dist/esm/index.esm.js',
      format: 'esm',
      sourcemap: true,
    }],
    onwarn(warning) {
      if (warning.code !== 'THIS_IS_UNDEFINED') {
        console.error(`(!) ${warning.message}`);
      }
    },
    plugins: [
      replace({'Reflect.decorate': 'undefined', preventAssignment: true}), // replace all instances of Reflect.decorate with undefined
      resolve(), // Resolve node_modules dependencies
      typescript(), // Use typescript
      summary(), // Generate and display summary Information
    ],
  },
  {
    input: 'src/lit-templates.ts',
    output:[ {
      file: 'dist/lit-templates.esm.js',
      format: 'esm',
      sourcemap: true,
    },{
      file: 'dist/lit-templates.js',      
      sourcemap: true,
    }, {
      file: 'dist/lit-templates.cjs',
      format: 'cjs',
      sourcemap: true,
    },
    {
      file: 'dist/esm/lit-templates.esm.js',
      format: 'esm',
      sourcemap: true,
    },
    {
      file: 'dist/esm/loader.js',      
      sourcemap: true,
    }],
    onwarn(warning) {
      if (warning.code !== 'THIS_IS_UNDEFINED') {
        console.error(`(!) ${warning.message}`);
      }
    },
    plugins: [
      replace({'Reflect.decorate': 'undefined', preventAssignment: true}), // replace all instances of Reflect.decorate with undefined
      resolve(), // Resolve node_modules dependencies
      typescript(),  // Use typescript
      summary(), // Generate and display summary Information
    ],
  },
];

web-dev-server-config.js

import {legacyPlugin} from '@web/dev-server-legacy';

const mode = process.env.MODE || 'dev';
if (!['dev', 'prod'].includes(mode)) {
  throw new Error(`MODE must be "dev" or "prod", was "${mode}"`);
}

export default {
  nodeResolve: {exportConditions: mode === 'dev' ? ['development'] : []},
  port: 3335,
  middleware: [
    async (context, next) => {      
      context.set('Access-Control-Allow-Origin', '*');            
      
      await next();
    },
  ],
  preserveSymlinks: true,
  plugins: [
    legacyPlugin({
      polyfills: {
        // Manually imported in index.html file
        webcomponents: false,
      },
    }),
  ],
};

4th Step:
If we want to use some of the optional dev features such as linting, code formatting, etc. we should create the configuration files for them, if not we can remove their respective scripts from package.json file.
Here are some default values:

.eslintignore

``
node_modules/*
rollup-config.js
web-dev-server.config.js
``

.eslintrc.json

``
{
  "root": true,
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended"
  ],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaVersion": 2020,
    "sourceType": "module"
  },
  "plugins": ["@typescript-eslint"],
  "env": {
    "browser": true
  },
  "rules": {
    "no-prototype-builtins": "off",
    "@typescript-eslint/ban-types": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-explicit-any": "error",
    "@typescript-eslint/no-empty-function": "off",
    "@typescript-eslint/no-non-null-assertion": "off",
    "@typescript-eslint/no-unused-vars": [
      "warn",
      {
        "argsIgnorePattern": "^_"
      }
    ]
  },
  "overrides": [
    {
      "files": ["rollup.config.js", "web-test-runner.config.js"],
      "env": {
        "node": true
      }
    },
    {
      "files": [
        "*_test.ts",
        "**/custom_typings/*.ts",
        "packages/labs/ssr/src/test/integration/tests/**",
        "packages/labs/ssr/src/lib/util/parse5-utils.ts"
      ],
      "rules": {
        "@typescript-eslint/no-explicit-any": "off"
      }
    }
  ]
}
``

.prettierrc.json

``
{
  "trailingComma": "es5",
  "tabWidth": 2,
  "singleQuote": true,
  "bracketSpacing": false,
  "arrowParens": "always"
}
``

5th Step:
With everything in place we can start creating our first component.
We will create a folder called /src in root and in it we will create another folder where we will put our template components, usually this is called how the templates are called, for our example it will be /example-templates.

Now let's create a file called my-element.ts, this is a simple lit component that will render a div with a text.

import {LitElement, html} from 'lit';
import {customElement} from 'lit/decorators.js';

@customElement('my-element')
export class MyElement extends LitElement {
  override render() {
    return html`
      <div>Hello from MyElement!</div>
    `;
  }
}

Now let's create in the root project a file called index.html this file will help us run the solution locally to see how the template looks and behaves as a first pass.
This should be the content of the index.html file:

<!DOCTYPE html>

<html>
  <head>
    <meta charset="utf-8" />
    <title>Lit-Templates View</title>
    <script src="../node_modules/@webcomponents/webcomponentsjs/webcomponents-loader.js"></script>
    <script src="../node_modules/lit/polyfill-support.js"></script>
    <script type="module" src="./dist/components/my-element.js"></script>
  </head>
  <body>
    <h2>Index:</h2>
    <my-element></my-element>
  </body>
</html>

It simply links the component in the <head> section and uses it in the <body> section.
Now let's run the command `npm run serve`.
The port from the web-dev-server.config.js file should serve our index file which displays our component.

6th Step:
Structure of a template: 
template header, content, footer, default data, info definition.
other objects that will help creating the template /template-blocks/address
adding models

7th Step:
template-package file, index file

8th Step:
Build and Link to Leya

9th Step:
Build and Test everything

10th Step:
Link to Designer while developing

<p align="right">(<a href="#about-the-project">back to top</a>)</p>

<!-- USAGE EXAMPLES -->

## Lit Project Structure

To use the tool, open the designer project URL (You can find the designer link in the PORTS tab of the IDK if you are using Gitpod, VS Code), the UI has three functionalities for users.

Deployed templates: custom templates modified by users and deployed for reusability.

Live templates: is a way to upload templates dynamically via a link. After the link is provided and button pressed the templates from the link wil appear.
A default collection is provided from the Templates project, to use it, start the project with npm start and past the link https://3333-{GITPOD-URL}/build/index.esm.js to the url textbox, remember to replace GITPOD-URL with the local url.

Upload templates: a drop zone discernible by borders with a button in the middle, in this area we can drag and drop a .TGZ file with one or more new templates.
After dropping the items, they will appear in the UI as deployed templates.

Clicking on a template name the user can see the template and, on the right, the json code to modify the fields of the template as required.
After modifying the fields to the user's liking there is a preview button to generate the PDF file and if needed it can be saved from there.

Please check our [INSTRUCTIONS](/INSTRUCTIONS.md) file for instructions.

<!-- LICENSE -->

## License

Distributed under the Apache License Version 2.0, License. See [LICENSE](/LICENSE) for more information.

<p align="right">(<a href="#about-the-project">back to top</a>)</p>