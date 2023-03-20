// @ts-check
const process = require('node:process');
const fs = require('node:fs');
const child_process = require('node:child_process');

updateEnv();

async function updateEnv() {
    console.log(process.env['GITPOD_WORKSPACE_URL']);
    const envFile = './src/assets/env.json';
    const changed = await new Promise(resolve => {
        child_process.exec('git diff ' + envFile, {
    
        }, (error, stdout) => {
            console.log('status', { stdout, bool: stdout.length > 0 });
            resolve(error || (stdout.length > 0));
        });
    });
    if (changed) {
        process.exit(0);
    }
    
    const gitpodUrl = process.env['GITPOD_WORKSPACE_URL'];
    if (gitpodUrl) {
        /**
         * @type {(port: number) => string}
         */
        const createSubUrl = (port) =>
            gitpodUrl.replace('https://', `https://${port}-`);
        fs.writeFileSync(envFile, JSON.stringify({
            backendBaseUrl: createSubUrl(6001),
            templateBaseUrl: createSubUrl(3333),
        }, null, 2));
        child_process.execSync('git update-index --assume-unchanged ' + envFile);
    } else {
        child_process.execSync('git checkout ' + envFile);
    }
}