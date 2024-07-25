'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-90772d73.js');
const invoiceSamples = require('./invoice-samples-da643b6c.js');

const _1InvoiceContentCss = "body{font-size:12pt;font-family:\"Lucida Sans\", \"Lucida Sans Regular\", \"Lucida Grande\", \"Lucida Sans Unicode\", Geneva, Verdana, sans-serif !important}@media print{@page {margin-left:20mm}}tpl-invoice-content{display:block;box-sizing:border-box;padding-top:0;padding-right:20mm;padding-bottom:0;padding-left:5mm;font-size:10pt}@media screen{tpl-invoice-content{margin-left:20mm}}tpl-invoice-content .invoice-content--number{text-align:right;font-family:monospace;font-size:9.5pt}tpl-invoice-content table{width:100%;border-collapse:collapse}tpl-invoice-content thead tr th{text-align:left}tpl-invoice-content thead tr th:nth-of-type(3){width:100%}tpl-invoice-content thead tr th:nth-of-type(4),tpl-invoice-content thead tr th:nth-of-type(5),tpl-invoice-content thead tr th:nth-of-type(7){text-align:right}tpl-invoice-content thead tr th:nth-of-type(6){text-align:center}tpl-invoice-content tbody td:nth-of-type(2),tpl-invoice-content thead th:nth-of-type(2){padding-right:2em;padding-left:0.2em}tpl-invoice-content tbody td:nth-of-type(4),tpl-invoice-content thead th:nth-of-type(4){padding-right:1em}tpl-invoice-content tbody td:nth-of-type(5),tpl-invoice-content thead th:nth-of-type(5){text-align:center;padding-left:1em;padding-right:1em}tpl-invoice-content tbody td:nth-of-type(6),tpl-invoice-content thead th:nth-of-type(6){padding-left:1em;padding-right:2em}tpl-invoice-content tbody tr:first-of-type td{border-top:1px solid black;padding-top:0.5em}tpl-invoice-content tbody tr:last-of-type td{padding-bottom:0.5em}tpl-invoice-content tfoot tr:first-of-type th{border-top:1px solid black;padding-top:0.5em}tpl-invoice-content tfoot th{text-align:right}tpl-invoice-content tfoot th:nth-of-type(2){padding-right:2em}.invoice__content-end{background:red;color:white;text-align:center;border:1px solid white}.invoice__content__spacer{margin:0.5cm 0;padding:0.5cm;border:1px solid green}";

const InvoiceContentTpl = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.invoice = window.providedData || invoiceSamples.invoiceSamples['invoice-001'];
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
    return index.h(index.Host, null, index.h("table", null, index.h("thead", null, index.h("tr", null, index.h("th", { colSpan: 2 }, "Qty"), index.h("th", { style: { display: 'none' } }), index.h("th", null, "Product Label"), index.h("th", null, "Price/Unit"), index.h("th", null, "VAT%"), index.h("th", null, "VAT"), index.h("th", null, "Price Pos."))), index.h("tbody", null, positions.map((pos) => index.h("tr", null, index.h("td", { class: "invoice-content--number" }, pos.quantity), index.h("td", null, pos.unit), index.h("td", null, pos.title), index.h("td", { class: "invoice-content--number" }, currency.format(pos.pricePerUnit)), index.h("td", { class: "invoice-content--number" }, pos.vatPercent), index.h("td", { class: "invoice-content--number" }, currency.format(pos.vat)), index.h("td", { class: "invoice-content--number" }, currency.format(pos.gross))))), index.h("tfoot", null, index.h("tr", null, index.h("th", { colSpan: 5 }), index.h("th", null, "Netto:"), index.h("th", { class: "invoice-content--number" }, currency.format(sums.netto))), index.h("tr", null, index.h("th", { colSpan: 5 }), index.h("th", null, "VAT:"), index.h("th", { class: "invoice-content--number" }, "+\u00A0", currency.format(sums.vat))), index.h("tr", null, index.h("th", { colSpan: 5 }), index.h("th", null, "Gross:"), index.h("th", { class: "invoice-content--number" }, currency.format(sums.gross))))));
  }
};
InvoiceContentTpl.style = _1InvoiceContentCss;

exports.tpl_invoice_content = InvoiceContentTpl;
