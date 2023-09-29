import path from 'node:path';
import fs from 'node:fs';

export function getEnv<T>(defaults: T): T {
    try {
        const envPath = path.resolve(__dirname, '../../config/local-env.json');
        if (!fs.existsSync(envPath)) {
            console.warn('no env using defaults - tried: ' + envPath);
            return defaults;
        }
        const envStr = fs.readFileSync(envPath, 'utf-8');
        const loadedEnv = JSON.parse(envStr);
        return Object.assign({}, defaults, loadedEnv);
    } catch (e) {
        console.error(e);
        console.log('Could not read local-env.json');
        return defaults;
    }
}