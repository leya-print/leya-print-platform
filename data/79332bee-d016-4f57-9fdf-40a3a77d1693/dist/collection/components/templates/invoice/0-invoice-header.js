import { h, Host, getAssetPath } from '@stencil/core';
import { invoiceSamples } from './invoice-samples';
export class InvoiceHeaderTpl {
  constructor() {
    this.invoice = window.providedData || invoiceSamples['invoice-001'];
  }
  render() {
    const invoice = this.invoice;
    const image = getAssetPath(`assets/leya.png`);
    return h(Host, null, h("div", { class: "invoice-header__img" }, h("div", { class: "invoice-header__img-size" }, h("leya-print-image-fetch", { imgSrc: image, class: "leya-print-image", imgAlt: "Company Logo" }))), h("div", { class: "invoice-header__address-box" }, h("div", { class: "invoice-header__sender" }, h("tplb-address-line", { address: invoice.sender.address })), h("div", { class: "invoice-header__additions" }), h("div", { class: "invoice-header__sendTo" }, h("tplb-address", { address: invoice.recipient.address }))), h("div", { class: "invoice-header__header-data" }, h("div", { class: "invoice-header__company" }, h("tplb-address", { address: invoice.sender.address }), h("div", null, "USt-IdNr.: ", invoice.sender.vatIdent)), invoice.customerReference && h("div", { class: "invoice-header__customer-reference" }, h("h3", null, h("span", null, h("svg", { viewBox: '0 0 60 10', xmlns: "http://www.w3.org/2000/svg" }, h("rect", { x1: 0, y1: 0, width: 60, height: 10 }), h("text", { x: 4, y: 7, fill: "white", "font-size": 5, stroke: "none" }, "customer reference:")))), h("div", { class: "invoice-header__customer-reference__content" }, invoice.customerReference.split('\n').map((l) => h("div", null, l))))), h("div", { class: "invoice-header__headline" }, h("h2", null, "Invoice ", this.invoice.invoiceNo), h("div", { class: "invoice-header__date" }, new Date(this.invoice.date).toLocaleDateString('en-US', { dateStyle: 'full' }))), h("div", { class: "invoice-header__foldmark-1" }, "\u00A0"), h("div", { class: "invoice-header__centermark" }, "\u00A0"), h("div", { class: "invoice-header__foldmark-2" }, "\u00A0"));
  }
  static get is() { return "tpl-invoice-header"; }
  static get originalStyleUrls() {
    return {
      "$": ["0-invoice-header.scss"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["0-invoice-header.css"]
    };
  }
  static get assetsDirs() { return ["assets"]; }
  static get states() {
    return {
      "invoice": {}
    };
  }
}
