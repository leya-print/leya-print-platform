import { expect } from "chai";
import { describe } from "mocha";
import { exists } from "./utils";

describe('server-common utils', () => {
    function getSample(shouldExist: true | string | null | undefined): string | null | undefined {
        return shouldExist ? 'bla' : shouldExist;
    }

    describe('exists', () => {
        it('should return "is T" if the param exists', () => {
            const value = getSample('exists');
            
            // @ts-expect-error
            value.length > 1;
            if (!exists(value)) { return; }

            // @ts-expect-no-error
            value.length > 1;

            expect(exists(value)).to.be.true;
        });

        it('should return false if the param is undefined', () => {
            const value = getSample(undefined);

            expect(exists(value)).to.be.false;
        });

        it('should return false if the param is null', () => {
            const value = getSample(null);

            expect(exists(value)).to.be.false;
        });

        it('should return true for existing falsy values', () => {
            const value = getSample('');

            expect(exists(value)).to.be.true;
        });
    });
});