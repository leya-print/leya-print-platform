'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-90772d73.js');
const invoiceSamples = require('./invoice-samples-da643b6c.js');

const _2InvoiceFooterCss = "tpl-invoice-footer{display:block;box-sizing:border-box;padding:1cm 2cm 1cm 25mm;padding-top:0}tpl-invoice-footer .invoice-footer__pageNumber{text-align:right;padding-top:4.23mm;font-size:10pt;margin-bottom:4.23mm}tpl-invoice-footer .invoice-footer__img{display:flex;justify-content:end;padding-bottom:0.2cm;padding-right:2cm;padding-left:2cm}tpl-invoice-footer .invoice-footer__img-size{width:110px;height:70px}tpl-invoice-footer .invoice-footer__details{text-align:center;font-size:7pt}tpl-invoice-footer .invoice-footer__details .invoice-footer__line span:not(:first-of-type)::before{content:\"|\";margin:0.5em}tpl-invoice-footer .invoice-footer__details .invoice-footer__line:not(:first-of-type){margin-top:0.2em}tpl-invoice-footer .leya-print-image{width:inherit;height:inherit}tpl-invoice-footer .leya-print-image .img-size{width:inherit;height:inherit}";

const InvoiceFooterTpl = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.invoice = window.providedData || invoiceSamples.invoiceSamples['invoice-001'];
  }
  render() {
    const image = index.getAssetPath(`assets/leya.png`);
    const sender = this.invoice.sender;
    const bank = sender.bankDetails;
    return index.h(index.Host, null, index.h("div", { class: "invoice-footer__img" }, index.h("div", { class: "invoice-footer__img-size" }, index.h("leya-print-image-fetch", { imgSrc: image, class: "leya-print-image", imgAlt: "Company Logo" }))), index.h("div", { class: "invoice-footer__pageNumber" }, "Page ", index.h("span", { class: "pageNumber" }, "99"), "/", index.h("span", { class: "totalPages" }, "99")), index.h("div", { class: "invoice-footer__details" }, index.h("div", { class: "invoice-footer__line invoice-footer__name" }, sender.address.company), [
      line(['Phone', sender.phone], ['Mail', sender.email], ['Web', sender.web]),
    ], index.h("div", { class: "invoice-footer__line invoice-footer__line__bank-details" }, "Bank details: ", bank.name, " IBAN: ", bank.iban, " BIC: ", bank.bic, index.h("br", null))));
  }
};
function line(...items) {
  return index.h("div", { class: "invoice-footer__line" }, items
    .filter(([_, value]) => !!value)
    .map(([label, value]) => index.h("span", null, index.h("label", null, label, ":"), " ", value)));
}
InvoiceFooterTpl.style = _2InvoiceFooterCss;

exports.tpl_invoice_footer = InvoiceFooterTpl;
