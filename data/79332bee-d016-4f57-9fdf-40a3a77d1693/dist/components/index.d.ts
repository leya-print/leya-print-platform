/* templates custom elements */
export { MyComponent as MyComponent } from '../types/components/my-component/my-component';
export { InvoiceContentTpl as TplInvoiceContent } from '../types/components/templates/invoice/1-invoice-content';
export { InvoiceFooterTpl as TplInvoiceFooter } from '../types/components/templates/invoice/2-invoice-footer';
export { InvoiceHeaderTpl as TplInvoiceHeader } from '../types/components/templates/invoice/0-invoice-header';
export { TemplateDemoContentTpl as TplTemplateDemoContent } from '../types/components/templates/template-demo/1-template-demo-content';
export { TemplateDemoFooterTpl as TplTemplateDemoFooter } from '../types/components/templates/template-demo/2-template-demo-footer';
export { TemplateDemoHeaderTpl as TplTemplateDemoHeader } from '../types/components/templates/template-demo/0-template-demo-header';
export { WorkReportContentTpl as TplWorkReportContent } from '../types/components/templates/work-report/1-work-report-content';
export { WorkReportFooterTpl as TplWorkReportFooter } from '../types/components/templates/work-report/2-work-report-footer';
export { WorkReportHeaderTpl as TplWorkReportHeader } from '../types/components/templates/work-report/0-work-report-header';
export { AddressComponent as TplbAddress } from '../types/components/template-blocks/address/address.component';
export { AddressComponent as TplbAddressLine } from '../types/components/template-blocks/address/address-line.component';

/**
 * Used to manually set the base path where assets can be found.
 * If the script is used as "module", it's recommended to use "import.meta.url",
 * such as "setAssetPath(import.meta.url)". Other options include
 * "setAssetPath(document.currentScript.src)", or using a bundler's replace plugin to
 * dynamically set the path at build time, such as "setAssetPath(process.env.ASSET_PATH)".
 * But do note that this configuration depends on how your script is bundled, or lack of
 * bundling, and where your assets can be loaded from. Additionally custom bundling
 * will have to ensure the static assets are copied to its build directory.
 */
export declare const setAssetPath: (path: string) => void;

/**
 * Used to specify a nonce value that corresponds with an application's CSP.
 * When set, the nonce will be added to all dynamically created script and style tags at runtime.
 * Alternatively, the nonce value can be set on a meta tag in the DOM head
 * (<meta name="csp-nonce" content="{ nonce value here }" />) which
 * will result in the same behavior.
 */
export declare const setNonce: (nonce: string) => void

export interface SetPlatformOptions {
  raf?: (c: FrameRequestCallback) => number;
  ael?: (el: EventTarget, eventName: string, listener: EventListenerOrEventListenerObject, options: boolean | AddEventListenerOptions) => void;
  rel?: (el: EventTarget, eventName: string, listener: EventListenerOrEventListenerObject, options: boolean | AddEventListenerOptions) => void;
}
export declare const setPlatformOptions: (opts: SetPlatformOptions) => void;
export * from '../types';
