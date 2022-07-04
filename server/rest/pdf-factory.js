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
     * @param {PageActions<R>} actions
     */
    async openPage(templateId, pagePart, queryParams, actions) {
        const urlWithParams = new URL(`${this._baseUrl}/${templateId}/${pagePart}`);
        Object.entries(queryParams).forEach(([key, value]) => urlWithParams.searchParams.set(key, value));

        const browser = await this.browser;
        const context = await browser.newContext();
        const page = await context.newPage();
        await Promise.all([
            page.goto('' + urlWithParams),
            page.waitForNavigation(),
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
     * @param {{[key: string]: string} } queryParams,
     */
    async create(templateId, queryParams) {
        /** @type {<R> (pagePart: string, actions: PageActions<R>) => Promise<R>} */
        const openPage = (pagePart, actions) => this.openPage(templateId, pagePart, queryParams, actions);
        const [header, footer] = await Promise.all(
            ['header', 'footer'].map((pagePart) => openPage(pagePart, async(page) => {
                const appRoot = page.locator('app-root');
                const html = await appRoot.innerHTML();
                const boundingBox = await appRoot.boundingBox();
                const boundingBoxHeight = boundingBox && boundingBox.height;
                const height = boundingBoxHeight ? boundingBoxHeight + 'mm' : '3cm';
                return { height, html };
            })),
        );

        const pdf = await openPage('content', async(page) => page.pdf({
            headerTemplate: header.html,
            footerTemplate: footer.html,
            displayHeaderFooter: true,
            printBackground: true,
            margin: {
                top: header.height,
                bottom: footer.height,
                left: 0,
                right: 0,
            }
        }));

        return pdf;
    }
}