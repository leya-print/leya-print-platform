import { proxyCustomElement, HTMLElement, getAssetPath, h, Host } from '@stencil/core/internal/client';
import { i as invoiceSamples } from './invoice-samples.js';

const _2InvoiceFooterCss = "tpl-invoice-footer{display:block;box-sizing:border-box;padding:1cm 2cm 1cm 25mm;padding-top:0}tpl-invoice-footer .invoice-footer__pageNumber{text-align:right;padding-top:4.23mm;font-size:10pt;margin-bottom:4.23mm}tpl-invoice-footer .invoice-footer__img{display:flex;justify-content:end;padding-bottom:0.2cm;padding-right:2cm;padding-left:2cm}tpl-invoice-footer .invoice-footer__img-size{width:110px;height:70px}tpl-invoice-footer .invoice-footer__details{text-align:center;font-size:7pt}tpl-invoice-footer .invoice-footer__details .invoice-footer__line span:not(:first-of-type)::before{content:\"|\";margin:0.5em}tpl-invoice-footer .invoice-footer__details .invoice-footer__line:not(:first-of-type){margin-top:0.2em}tpl-invoice-footer .leya-print-image{width:inherit;height:inherit}tpl-invoice-footer .leya-print-image .img-size{width:inherit;height:inherit}";

const InvoiceFooterTpl = /*@__PURE__*/ proxyCustomElement(class extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.invoice = window.providedData || invoiceSamples['invoice-001'];
  }
  render() {
    const image = getAssetPath(`assets/leya.png`);
    const sender = this.invoice.sender;
    const bank = sender.bankDetails;
    return h(Host, null, h("div", { class: "invoice-footer__img" }, h("div", { class: "invoice-footer__img-size" }, h("leya-print-image-fetch", { imgSrc: image, class: "leya-print-image", imgAlt: "Company Logo" }))), h("div", { class: "invoice-footer__pageNumber" }, "Page ", h("span", { class: "pageNumber" }, "99"), "/", h("span", { class: "totalPages" }, "99")), h("div", { class: "invoice-footer__details" }, h("div", { class: "invoice-footer__line invoice-footer__name" }, sender.address.company), [
      line(['Phone', sender.phone], ['Mail', sender.email], ['Web', sender.web]),
    ], h("div", { class: "invoice-footer__line invoice-footer__line__bank-details" }, "Bank details: ", bank.name, " IBAN: ", bank.iban, " BIC: ", bank.bic, h("br", null))));
  }
  static get style() { return _2InvoiceFooterCss; }
}, [0, "tpl-invoice-footer", {
    "invoice": [32]
  }]);
function line(...items) {
  return h("div", { class: "invoice-footer__line" }, items
    .filter(([_, value]) => !!value)
    .map(([label, value]) => h("span", null, h("label", null, label, ":"), " ", value)));
}
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["tpl-invoice-footer"];
  components.forEach(tagName => { switch (tagName) {
    case "tpl-invoice-footer":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, InvoiceFooterTpl);
      }
      break;
  } });
}

const TplInvoiceFooter = InvoiceFooterTpl;
const defineCustomElement = defineCustomElement$1;

export { TplInvoiceFooter, defineCustomElement };
