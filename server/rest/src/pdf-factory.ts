import { chromium, Page } from 'playwright';

type PageActions<R> = (page: Page) => Promise<R>;

export class PdfFactory {
    _baseUrl: string;

    constructor(baseUrl: string) {
        this._baseUrl = baseUrl;
    }

    get browser() {
        const browserPromise = chromium.launch();
        Object.defineProperty(this, 'browser', { value: browserPromise, writable: false });

        return browserPromise;
    }

    async openPage<R>(templateId: string, pagePart: string, queryParams: {[key: string]: string}, actions: PageActions<R>) {
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
     */
    async create(templateId: string, queryParams: {[key: string]: any }) {
        const openPage = <R> (pagePart: string, actions: PageActions<R>) => this.openPage(templateId, pagePart, queryParams, actions);
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