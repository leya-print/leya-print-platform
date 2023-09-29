// rollup.config.js
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import json from '@rollup/plugin-json';

export default {
  input: 'index.ts',
  output: {
    dir: 'dist',
    format: 'cjs',
  },
  plugins: [
    typescript(),
    resolve(),
    json(),
    nodeResolve(),
    commonjs(),
  ],
};
