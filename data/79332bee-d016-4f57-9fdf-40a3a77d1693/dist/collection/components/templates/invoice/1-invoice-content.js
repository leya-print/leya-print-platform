import { h, Host } from '@stencil/core';
import { invoiceSamples } from './invoice-samples';
export class InvoiceContentTpl {
  constructor() {
    this.invoice = window.providedData || invoiceSamples['invoice-001'];
  }
  render() {
    const positions = this.invoice.positions.map((pos) => {
      const netto = pos.quantity * pos.pricePerUnit;
      const vat = netto * pos.vatPercent;
      const gross = netto + vat;
      return Object.assign(Object.assign({}, pos), { netto, vat, gross });
    });
    const sums = positions.reduce(({ netto, vat, gross }, pos) => ({
      netto: netto + pos.netto,
      vat: vat + pos.vat,
      gross: gross + pos.gross,
    }), { netto: 0, vat: 0, gross: 0 });
    const currency = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    });
    return h(Host, null, h("table", null, h("thead", null, h("tr", null, h("th", { colSpan: 2 }, "Qty"), h("th", { style: { display: 'none' } }), h("th", null, "Product Label"), h("th", null, "Price/Unit"), h("th", null, "VAT%"), h("th", null, "VAT"), h("th", null, "Price Pos."))), h("tbody", null, positions.map((pos) => h("tr", null, h("td", { class: "invoice-content--number" }, pos.quantity), h("td", null, pos.unit), h("td", null, pos.title), h("td", { class: "invoice-content--number" }, currency.format(pos.pricePerUnit)), h("td", { class: "invoice-content--number" }, pos.vatPercent), h("td", { class: "invoice-content--number" }, currency.format(pos.vat)), h("td", { class: "invoice-content--number" }, currency.format(pos.gross))))), h("tfoot", null, h("tr", null, h("th", { colSpan: 5 }), h("th", null, "Netto:"), h("th", { class: "invoice-content--number" }, currency.format(sums.netto))), h("tr", null, h("th", { colSpan: 5 }), h("th", null, "VAT:"), h("th", { class: "invoice-content--number" }, "+\u00A0", currency.format(sums.vat))), h("tr", null, h("th", { colSpan: 5 }), h("th", null, "Gross:"), h("th", { class: "invoice-content--number" }, currency.format(sums.gross))))));
  }
  static get is() { return "tpl-invoice-content"; }
  static get originalStyleUrls() {
    return {
      "$": ["1-invoice-content.scss"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["1-invoice-content.css"]
    };
  }
  static get states() {
    return {
      "invoice": {}
    };
  }
}
