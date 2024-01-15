/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

import summary from 'rollup-plugin-summary';
import {terser} from 'rollup-plugin-terser';
import resolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import scss from 'rollup-plugin-scss';

export default [
  {  
    input: 'src/index.ts',
    output: {    
      file: 'dist/index.esm.js',
      format: 'esm',
      sourcemap: true,
    },
    onwarn(warning) {
      if (warning.code !== 'THIS_IS_UNDEFINED') {
        console.error(`(!) ${warning.message}`);
      }
    },
    plugins: [
      replace({'Reflect.decorate': 'undefined', preventAssignment: true}),
      scss(),
      resolve(),
      typescript(),      
      commonjs({
        include: /\/node_modules\//,
        transformMixedEsModules: true, // Add this option to address compatibility issues
      }),
      /**
       * This minification setup serves the static site generation.
       * For bundling and minification, check the README.md file.
       */
      terser({
        ecma: 2021,
        module: true,
        warnings: true,
        mangle: {
          properties: {
            regex: /^__/,
          },
        },
      }),
      summary(),
    ],
  },
  {  
    input: 'src/my-element.ts',
    output: {    
      file: 'dist/templates.esm.js',
      format: 'esm',
      sourcemap: true,
    },
    onwarn(warning) {
      if (warning.code !== 'THIS_IS_UNDEFINED') {
        console.error(`(!) ${warning.message}`);
      }
    },
    plugins: [
      replace({'Reflect.decorate': 'undefined', preventAssignment: true}),
      scss(),
      resolve(),
      typescript(),
      commonjs({
        include: /\/node_modules\//,
        transformMixedEsModules: true, // Add this option to address compatibility issues
      }),
      /**
       * This minification setup serves the static site generation.
       * For bundling and minification, check the README.md file.
       */
      terser({
        ecma: 2021,
        module: true,
        warnings: true,
        mangle: {
          properties: {
            regex: /^__/,
          },
        },
      }),
      summary(),
    ],
  }
];
