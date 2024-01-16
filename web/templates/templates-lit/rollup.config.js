/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

import summary from 'rollup-plugin-summary';
import resolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';

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
      resolve(),
      typescript(),
      commonjs({
        include: /\/node_modules\//,
        transformMixedEsModules: true, // Add this option to address compatibility issues
      }),
      summary(),
    ],
  },
  {
    input: 'src/lit-templates.ts',
    output: {
      file: 'dist/lit-templates.esm.js',
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
      resolve(),
      typescript(),
      commonjs({
        include: /\/node_modules\//,
        transformMixedEsModules: true, // Add this option to address compatibility issues
      }),
      summary(),
    ],
  },
];
