'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-90772d73.js');

/*
 Stencil Client Patch Esm v2.22.3 | MIT Licensed | https://stenciljs.com
 */
const patchEsm = () => {
    return index.promiseResolve();
};

const defineCustomElements = (win, options) => {
  if (typeof window === 'undefined') return Promise.resolve();
  return patchEsm().then(() => {
  return index.bootstrapLazy([["tpl-invoice-header.cjs",[[0,"tpl-invoice-header",{"invoice":[32]}]]],["my-component.cjs",[[1,"my-component",{"first":[1],"middle":[1],"last":[1]}]]],["tpl-invoice-content.cjs",[[0,"tpl-invoice-content",{"invoice":[32]}]]],["tpl-invoice-footer.cjs",[[0,"tpl-invoice-footer",{"invoice":[32]}]]],["tpl-template-demo-content.cjs",[[0,"tpl-template-demo-content"]]],["tpl-template-demo-footer.cjs",[[0,"tpl-template-demo-footer"]]],["tpl-template-demo-header.cjs",[[0,"tpl-template-demo-header"]]],["tpl-work-report-content.cjs",[[0,"tpl-work-report-content"]]],["tpl-work-report-footer.cjs",[[0,"tpl-work-report-footer"]]],["tpl-work-report-header.cjs",[[0,"tpl-work-report-header"]]],["tplb-address_2.cjs",[[0,"tplb-address",{"address":[16]}],[0,"tplb-address-line",{"address":[16]}]]]], options);
  });
};

exports.setNonce = index.setNonce;
exports.defineCustomElements = defineCustomElements;
