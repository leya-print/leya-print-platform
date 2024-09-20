import { h, Host, getAssetPath } from '@stencil/core';
import { invoiceSamples } from './invoice-samples';
export class InvoiceFooterTpl {
  constructor() {
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
  static get is() { return "tpl-invoice-footer"; }
  static get originalStyleUrls() {
    return {
      "$": ["2-invoice-footer.scss"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["2-invoice-footer.css"]
    };
  }
  static get states() {
    return {
      "invoice": {}
    };
  }
}
function line(...items) {
  return h("div", { class: "invoice-footer__line" }, items
    .filter(([_, value]) => !!value)
    .map(([label, value]) => h("span", null, h("label", null, label, ":"), " ", value)));
}
