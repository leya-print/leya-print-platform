import { Config } from "@stencil/core";
import { config as devConfig } from './stencil.config';

export const config: Config = {
    ...devConfig,
    outputTargets: [
        {
            type: 'www',
            // comment the following line to disable service workers in production
            serviceWorker: null,
            baseUrl: '/dev', // required for pre rendering
            dir: 'www-prod',          
        },
    ],
}