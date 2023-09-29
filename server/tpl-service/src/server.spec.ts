import { expect } from "chai";
import fetch from "cross-fetch";
import { describe, it } from "mocha";

describe('pdf-service', () => {
    it('should start', async () => {
        await import('./server');
        const result = await fetch('http://localhost:6004/auth');
        expect(result.ok).to.be.true;
    });

    it('should protect something', async () => {
        const result = await fetch('http://localhost:6004/auth', {
            headers: {
                ['x-forwarded-uri']: '/protected' // x-forwarded-uri is set by nginx
            }
        });
        expect(result.status).to.equal(401);
    });
});