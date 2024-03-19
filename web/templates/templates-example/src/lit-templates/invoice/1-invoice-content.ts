import {LitElement, html} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {Invoice} from '../../models/invoice.model';
import {invoiceSamples} from './invoice-samples';

@customElement('tpl-invoice-content')
export class InvoiceContentTpl extends LitElement {
  @property()
  invoice: Invoice =
    (window as any).providedData || invoiceSamples['invoice-001'];
  
  /* Switch to Light DOM
  By default LIT renders components to shadow DOM which cannot be rendered by the Leya Printing Service.
  The component should render using Light DOM to work.
  */
  override createRenderRoot() {
    return this;
  }

  override render() {
    const positions = this.invoice.positions.map((pos) => {
      const netto = pos.quantity * pos.pricePerUnit;
      const vat = netto * pos.vatPercent;
      const gross = netto + vat;
      return {
        ...pos,
        netto,
        vat,
        gross,
      };
    });
    const sums = positions.reduce(
      ({netto, vat, gross}, pos) => ({
        netto: netto + pos.netto,
        vat: vat + pos.vat,
        gross: gross + pos.gross,
      }),
      {netto: 0, vat: 0, gross: 0}
    );

    const currency = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    });

    return html`    
    <style>
      body {
        font-size: 12pt;
        font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande", "Lucida Sans Unicode", Geneva, Verdana, sans-serif !important;
      }
      
      @media print {
        @page {
          margin-left: 20mm;
        }
      }
      tpl-invoice-content {
        display: block;
        box-sizing: border-box;
        padding-top: 0;
        padding-right: 20mm;
        padding-bottom: 0;
        padding-left: 5mm;
        font-size: 10pt;
      }
      @media screen {
        tpl-invoice-content {
          margin-left: 20mm;
        }
      }
      tpl-invoice-content .invoice-content--number {
        text-align: right;
        font-family: monospace;
        font-size: 9.5pt;
      }
      tpl-invoice-content table {
        width: 100%;
        border-collapse: collapse;
      }
      tpl-invoice-content thead tr th {
        text-align: left;
      }
      tpl-invoice-content thead tr th:nth-of-type(3) {
        width: 100%;
      }
      tpl-invoice-content thead tr th:nth-of-type(4), tpl-invoice-content thead tr th:nth-of-type(5), tpl-invoice-content thead tr th:nth-of-type(7) {
        text-align: right;
      }
      tpl-invoice-content thead tr th:nth-of-type(6) {
        text-align: center;
      }
      tpl-invoice-content tbody td:nth-of-type(2), tpl-invoice-content thead th:nth-of-type(2) {
        padding-right: 2em;
        padding-left: 0.2em;
      }
      tpl-invoice-content tbody td:nth-of-type(4), tpl-invoice-content thead th:nth-of-type(4) {
        padding-right: 1em;
      }
      tpl-invoice-content tbody td:nth-of-type(5), tpl-invoice-content thead th:nth-of-type(5) {
        text-align: center;
        padding-left: 1em;
        padding-right: 1em;
      }
      tpl-invoice-content tbody td:nth-of-type(6), tpl-invoice-content thead th:nth-of-type(6) {
        padding-left: 1em;
        padding-right: 2em;
      }
      tpl-invoice-content tbody tr:first-of-type td {
        border-top: 1px solid black;
        padding-top: 0.5em;
      }
      tpl-invoice-content tbody tr:last-of-type td {
        padding-bottom: 0.5em;
      }
      tpl-invoice-content tfoot tr:first-of-type th {
        border-top: 1px solid black;
        padding-top: 0.5em;
      }
      tpl-invoice-content tfoot th {
        text-align: right;
      }
      tpl-invoice-content tfoot th:nth-of-type(2) {
        padding-right: 2em;
      }
      
      .invoice__content-end {
        background: red;
        color: white;
        text-align: center;
        border: 1px solid white;
      }
      
      .invoice__content__spacer {
        margin: 0.5cm 0;
        padding: 0.5cm;
        border: 1px solid green;
      }    
    </style>
    <Host class="invoice__content-body">
      <table>
        <thead>
          <tr>
            <th colSpan={2}>Qty</th>
            <th style={{display: 'none'}}></th>
            <th>Product Label</th>
            <th>Price/Unit</th>
            <th>VAT%</th>
            <th>VAT</th>
            <th>Price Pos.</th>
          </tr>
        </thead>
        <tbody>
          ${positions.map(
            (pos) => html`<tr>
              <td class="invoice-content--number">${pos.quantity}</td>
              <td>${pos.unit}</td>
              <td>${pos.title}</td>
              <td class="invoice-content--number">
                ${currency.format(pos.pricePerUnit)}
              </td>
              <td class="invoice-content--number">${pos.vatPercent}</td>
              <td class="invoice-content--number">
                ${currency.format(pos.vat)}
              </td>
              <td class="invoice-content--number">
                ${currency.format(pos.gross)}
              </td>
            </tr>`
          )}
        </tbody>
        <tfoot>
          <tr><th colSpan={5}></th><th>Netto:</th><th class="invoice-content--number">${currency.format(
            sums.netto
          )}</th></tr>
          <tr><th colSpan={5}></th><th>VAT:</th><th class="invoice-content--number">+&nbsp;${currency.format(
            sums.vat
          )}</th></tr>
          <tr><th colSpan={5}></th><th>Gross:</th><th class="invoice-content--number">${currency.format(
            sums.gross
          )}</th></tr>
        </tfoot>
      </table>
    </Host>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'tpl-invoice-content': InvoiceContentTpl;
  }
}