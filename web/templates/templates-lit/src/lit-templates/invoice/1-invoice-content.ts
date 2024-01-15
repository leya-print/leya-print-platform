import {LitElement, html, css} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import { Invoice } from '../../models/invoice.model';
import { invoiceSamples } from './invoice-samples';

@customElement('tpl-invoice-content')
export class InvoiceContentTpl extends LitElement {
  // static override styles = css`@import '1-invoice-content.scss';`;
  static override styles = css`
  body {
    font-size: 12pt;
    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif !important;
    display: block;
    padding: $var__page__margin;
    padding-bottom: 0;
    font-size: 10pt;
    min-height: 88mm;
  }
  
  $var__page__margin: 1cm 2cm 1cm 25mm;
  $var__innerPadding: .5cm;

  .invoice__content-end {
    background: red;
    color: white;
    text-align: center;
    border: 1px solid white;
  }

  .invoice__content__spacer {
      margin: $var__innerPadding 0;
      padding: $var__innerPadding;
      border: 1px solid green;
  }

  .invoice-content--number {
    text-align: right;
    font-family: monospace;
    font-size: 9.5pt;
  }

  table {
    width: 100%;
    border-collapse: collapse;

  }

  thead {
    tr {
      th {
        text-align: left;

        &:nth-of-type(#{$col-label}) {
          width: 100%;
        }

        &:nth-of-type(#{$col-pricePerUnit}),
        &:nth-of-type(#{$col-vatPercent}),
        &:nth-of-type(#{$col-gross}) {
          text-align: right;
        }

        &:nth-of-type(#{$col-vat}) {
          text-align: center;
        }
      }
    }
  }

  tbody td, thead th {
    &:nth-of-type(#{$col-unit}) {
      padding-right: $col-spacing;
      padding-left: .1 * $col-spacing;
    }

    &:nth-of-type(#{$col-pricePerUnit}) {
      padding-right: .5 * $col-spacing;
    }

    &:nth-of-type(#{$col-vatPercent}) {
      text-align: center;
      padding-left: .5 * $col-spacing;
      padding-right: .5 * $col-spacing;
    }

    &:nth-of-type(#{$col-vat}) {
      padding-left: .5 * $col-spacing;
      padding-right: 1 * $col-spacing;
    }
  }

  .tpl-invoice-content {
      display: block;
      box-sizing: border-box;

      @media screen {
        margin-left: 20mm; // print page padding
      }

      padding-top: 0;
      padding-right: 20mm;
      padding-bottom: 0;
      padding-left: 5mm;
      font-size: 10pt;

      $col-qty: 1;
      $col-unit: 2;
      $col-label: 3;
      $col-pricePerUnit: 4;
      $col-vatPercent: 5;
      $col-vat: 6;
      $col-gross: 7;

      $col-spacing: 2em;      

      tbody {
        tr:first-of-type {
          td {
            border-top: 1px solid black;
            padding-top: .5em;
          }
        }
        tr:last-of-type {
          td {
            padding-bottom: .5em;
          }
        }
      }

      tfoot {
        tr:first-of-type {
          th {
            border-top: 1px solid black;
            padding-top: .5em;
          }
        }
        th {
          text-align: right;

          $col-label: 2;
          $col-value: 3;

          &:nth-of-type(#{$col-label}) {
            padding-right: $col-spacing;
          }
        }
      }
  }
  `;

  @property() 
  invoice: Invoice = (window as any).providedData || invoiceSamples['invoice-001'];  
  
  @property({type: Number})
  count = 0;

  override render() {
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

    return html`    
    <Host>
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
          ${positions.map((pos) => html`<tr>
            <td class="invoice-content--number">${pos.quantity}</td>
            <td>${pos.unit}</td>
            <td>${pos.title}</td>
            <td class="invoice-content--number">${currency.format(pos.pricePerUnit)}</td>
            <td class="invoice-content--number">${pos.vatPercent}</td>
            <td class="invoice-content--number">${currency.format(pos.vat)}</td>
            <td class="invoice-content--number">${currency.format(pos.gross)}</td>
          </tr>`)}
        </tbody>
        <tfoot>
          <tr><th colSpan={5}></th><th>Netto:</th><th class="invoice-content--number">${currency.format(sums.netto)}</th></tr>
          <tr><th colSpan={5}></th><th>VAT:</th><th class="invoice-content--number">+&nbsp;${currency.format(sums.vat)}</th></tr>
          <tr><th colSpan={5}></th><th>Gross:</th><th class="invoice-content--number">${currency.format(sums.gross)}</th></tr>
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