import {LitElement, html, unsafeCSS} from 'lit';
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
      ${unsafeCSS(require("./1-invoice-content.scss"))}
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