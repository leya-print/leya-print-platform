import type { Invoice } from '@leya-print/common-api';
import { Component, h, Host, State } from '@stencil/core';
import { invoiceSamples } from './invoice-samples';

@Component({
  tag: 'tpl-invoice-content',
  styleUrl: '1-invoice-content.scss',
  shadow: false,
})
export class InvoiceContentTpl {
  @State() invoice: Invoice = (window as any).providedData || invoiceSamples['invoice-001'];
  render() {
    const positions = this.invoice.positions.map((pos) => {
      const netto = pos.quantity * pos.pricePerUnit;
      const vat = netto * pos.vatPercent;
      const gross = netto + vat;
      return {
        ...pos,
        netto, vat, gross,
      }
    });
    const sums = positions.reduce(({ netto, vat, gross }, pos) => ({
      netto: netto + pos.netto,
      vat: vat + pos.vat,
      gross: gross + pos.gross,
    }), { netto: 0, vat: 0, gross: 0 });
    const currency = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    })
    return <Host>
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
          {positions.map((pos) => <tr>
            <td class="invoice-content--number">{ pos.quantity}</td>
            <td>{pos.unit}</td>
            <td>{pos.title}</td>
            <td class="invoice-content--number">{currency.format(pos.pricePerUnit)}</td>
            <td class="invoice-content--number">{pos.vatPercent}</td>
            <td class="invoice-content--number">{currency.format(pos.vat)}</td>
            <td class="invoice-content--number">{currency.format(pos.gross)}</td>
          </tr>)}
        </tbody>
        <tfoot>
          <tr><th colSpan={5}></th><th>Netto:</th><th class="invoice-content--number">{currency.format(sums.netto)}</th></tr>
          <tr><th colSpan={5}></th><th>VAT:</th><th class="invoice-content--number">+&nbsp;{currency.format(sums.vat)}</th></tr>
          <tr><th colSpan={5}></th><th>Gross:</th><th class="invoice-content--number">{currency.format(sums.gross)}</th></tr>
        </tfoot>
      </table>
    </Host>
  }
}
