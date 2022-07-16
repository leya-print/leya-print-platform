// @ts-check
'use strict';

import { chromium } from 'playwright';

/**
 * @template R
 * @typedef {(page: import('playwright').Page) => Promise<R>} PageActions<R>
 */

export class PdfFactory {
    /** @type {string} */
    _baseUrl;

    /**
     * @param {string} baseUrl 
     */
    constructor(baseUrl) {
        this._baseUrl = baseUrl;
    }

    /** @type {Promise<import('playwright').Browser>} */
    get browser() {
        const browserPromise = chromium.launch();
        Object.defineProperty(this, 'browser', { value: browserPromise, writable: false });

        return browserPromise;
    }

    /**
     * @template R
     * @param {string} templateId 
     * @param {string} pagePart 
     * @param {{[key: string]: string}} queryParams
     * @param {string | undefined} providedData
     * @param {PageActions<R>} actions
     */
    async openPage(templateId, pagePart, queryParams, providedData, actions) {
        const urlWithParams = new URL(`${this._baseUrl}/${templateId}/${pagePart}`);
        Object.entries(queryParams).forEach(([key, value]) => urlWithParams.searchParams.set(key, value));

        const browser = await this.browser;
        const context = await browser.newContext();
        const page = await context.newPage();
        if (providedData) {
            await page.evaluate((data) => {
                (/** @type {*} */ (window)).providedData = JSON.parse(data);
                return Promise.resolve(true);
            }, providedData);
        }
        await Promise.all([
            page.goto('' + urlWithParams),
            page.waitForNavigation().then(async () => {
                if (providedData) {
                    await page.evaluate((data) => {
                        (/** @type {*} */ (window)).providedData = JSON.parse(data);
                        return Promise.resolve(true);
                    }, providedData);
                }
            }),
            page.waitForSelector('app-root'),
        ]);

        const result = await actions(page);

        await context.close();
        return result;
    }

    /** 
     * creates an pdf from a template id
     * 
     * @param {string} templateId,
     * @param {{[key: string]: any} } queryParams,
     * @param {string | undefined} providedData,
     */
    async create(templateId, queryParams, providedData) {
        /** @type {<R> (pagePart: string, actions: PageActions<R>) => Promise<R>} */
        const openPage = (pagePart, actions) => this.openPage(templateId, pagePart, queryParams, providedData, actions);
        const [header, footer] = await Promise.all(
            ['header', 'footer'].map((pagePart) => openPage(pagePart, async(page) => {
                const styles = await page.$$('style');
                const stylesHtml = `<style>\n${(await Promise.all(styles.map(async(next) => {
                    const styleText = await next.innerHTML();
                    return styleText;
                }))).join('\n\n')}\n</style>`;
                const appRoot = page.locator('app-root');
                const appRootHtml = await appRoot.innerHTML();
                const boundingBox = await appRoot.boundingBox();
                const boundingBoxHeight = boundingBox && boundingBox.height;

                const html = stylesHtml + appRootHtml;
                const height = boundingBoxHeight ? boundingBoxHeight + 'px' : '0';
                return { height, html };
            })),
        );

        const pdf = await openPage('content', async(page) => page.pdf({
            headerTemplate: header.html,
            footerTemplate: footer.html,
            displayHeaderFooter: true,
            printBackground: true,
            format: 'A4',
            margin: {
                top: header.height,
                bottom: footer.height,
                left: 0,
                right: 0,
            },

        }));

        return pdf;
    }
}