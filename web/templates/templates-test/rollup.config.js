
import summary from 'rollup-plugin-summary';
import resolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import typescript from '@rollup/plugin-typescript';

export default [
    {
    input: 'src/example-templates/my-element.ts',
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
  // {
  //   input: 'src/index.ts',
  //   output: [{
  //     file: 'dist/index.esm.js',
  //     format: 'esm',
  //     sourcemap: true,
  //   },
  //   {
  //     file: 'dist/index.cjs',
  //     format: 'cjs',
  //     sourcemap: true,
  //   },
  //   {
  //     file: 'dist/esm/index.js',
  //     sourcemap: true,
  //   },
  //   {
  //     file: 'dist/esm/index.esm.js',
  //     format: 'esm',
  //     sourcemap: true,
  //   }],
  //   onwarn(warning) {
  //     if (warning.code !== 'THIS_IS_UNDEFINED') {
  //       console.error(`(!) ${warning.message}`);
  //     }
  //   },
  //   plugins: [
  //     replace({'Reflect.decorate': 'undefined', preventAssignment: true}), // replace all instances of Reflect.decorate with undefined
  //     resolve(), // Resolve node_modules dependencies
  //     typescript(), // Use typescript
  //     summary(), // Generate and display summary Information
  //   ],
  // },
  // {
  //   input: 'src/lit-templates.ts',
  //   output:[ {
  //     file: 'dist/lit-templates.esm.js',
  //     format: 'esm',
  //     sourcemap: true,
  //   },{
  //     file: 'dist/lit-templates.js',      
  //     sourcemap: true,
  //   }, {
  //     file: 'dist/lit-templates.cjs',
  //     format: 'cjs',
  //     sourcemap: true,
  //   },
  //   {
  //     file: 'dist/esm/lit-templates.esm.js',
  //     format: 'esm',
  //     sourcemap: true,
  //   },
  //   {
  //     file: 'dist/esm/loader.js',      
  //     sourcemap: true,
  //   }],
  //   onwarn(warning) {
  //     if (warning.code !== 'THIS_IS_UNDEFINED') {
  //       console.error(`(!) ${warning.message}`);
  //     }
  //   },
  //   plugins: [
  //     replace({'Reflect.decorate': 'undefined', preventAssignment: true}), // replace all instances of Reflect.decorate with undefined
  //     resolve(), // Resolve node_modules dependencies
  //     typescript(),  // Use typescript
  //     summary(), // Generate and display summary Information
  //   ],
  // },
];