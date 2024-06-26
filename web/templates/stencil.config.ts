import { Config } from '@stencil/core';
import { sass } from '@stencil/sass';

export const config: Config = {
  namespace: 'templates',
  outputTargets: [
    {
      type: 'dist',
      esmLoaderPath: '../loader',
    },
    {
      type: 'dist-custom-elements',
      copy: [
        {
          src: '**/*.{jpg,png}',
          dest: 'dist/assets',
          warn: true,
        }
      ]
    },
    {
      type: 'dist-custom-elements',
      copy: [
        {
          src: '**/*.{jpg,png}',
          dest: 'www/build/assets',
          warn: true,
        }
      ]
    },
    {
      type: 'dist-custom-elements',
    },
    {
      type: 'docs-readme',
    },
    {
      type: 'www',
      serviceWorker: null, // disable service workers
    },
  ],
  plugins: [
    sass({
      includePaths: [
        'src/theme',
      ],
    }),
  ],
  devServer: {
    openBrowser: false,
  }
};
