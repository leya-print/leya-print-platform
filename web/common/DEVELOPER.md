# Leya-Print Stencil Project - Developer Guide

## Table of Contents
- [Introduction](#introduction)
- [Getting Started](#getting-started)
- [Available NPM Scripts](#available-npm-scripts)
- [Building for Production](#building-for-production)
- [Running Tests](#running-tests)
- [Component Generation](#component-generation)
- [Contact](#contact)

## Introduction
This project is for building standalone Web Components under the Leya-Print scope using Stencil.

## Getting Started

1. Navigate to the [project directory](./).
2. Install the dependencies, if you haven't already:  
    ```bash
    npm install
    ```
3. Start the development server:  
    ```bash
    npm run start
    ```

## Available NPM Scripts

To have an overview of the available npm scripts, refer to the `package.json`. Here are some of the commonly used scripts:

- [Start Development Server](#getting-started)
- [Building for Production](#building-for-production)
- [Running Tests](#running-tests)
- [Component Generation](#component-generation)

## Building for Production
To build the project for production, use the following command:  
```bash
npm run build
```

## Running Tests
Run the unit tests and end-to-end tests using the command below:  
```bash
npm run test
```
To run tests in watch mode, use:  
```bash
npm run test:watch
```

## Component Generation
To generate a new component, execute the following commands:

1. Generate the component files:
    ```bash
    npm run generate
    ```
2. When prompted, enter the name of the component and choose the additional files you'd like to create, such as styles and unit tests.

## Contact
For further queries, contact us at info@leya-it-solutions.de.
