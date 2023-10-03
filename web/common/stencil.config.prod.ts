import { Config } from "@stencil/core";
import { config as devConfig } from './stencil.config';

export const config: Config = {
    ...devConfig,
    outputTargets: [
        {
            type: 'dist',
            esmLoaderPath: '../loader',
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
            dir: 'www-prod',
        },
    ],
    tsconfig: 'tsconfig.build.json',
}