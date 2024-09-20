import { p as promiseResolve, b as bootstrapLazy } from './index-11521ed9.js';
export { s as setNonce } from './index-11521ed9.js';

/*
 Stencil Client Patch Esm v2.22.3 | MIT Licensed | https://stenciljs.com
 */
const patchEsm = () => {
    return promiseResolve();
};

const defineCustomElements = (win, options) => {
  if (typeof window === 'undefined') return Promise.resolve();
  return patchEsm().then(() => {
  return bootstrapLazy([["tpl-invoice-header",[[0,"tpl-invoice-header",{"invoice":[32]}]]],["my-component",[[1,"my-component",{"first":[1],"middle":[1],"last":[1]}]]],["tpl-invoice-content",[[0,"tpl-invoice-content",{"invoice":[32]}]]],["tpl-invoice-footer",[[0,"tpl-invoice-footer",{"invoice":[32]}]]],["tpl-template-demo-content",[[0,"tpl-template-demo-content"]]],["tpl-template-demo-footer",[[0,"tpl-template-demo-footer"]]],["tpl-template-demo-header",[[0,"tpl-template-demo-header"]]],["tpl-work-report-content",[[0,"tpl-work-report-content"]]],["tpl-work-report-footer",[[0,"tpl-work-report-footer"]]],["tpl-work-report-header",[[0,"tpl-work-report-header"]]],["tplb-address_2",[[0,"tplb-address",{"address":[16]}],[0,"tplb-address-line",{"address":[16]}]]]], options);
  });
};

export { defineCustomElements };
