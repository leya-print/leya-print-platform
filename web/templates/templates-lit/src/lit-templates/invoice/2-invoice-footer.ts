import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { Invoice } from '../../models/invoice.model';
import { invoiceSamples } from './invoice-samples';

@customElement('tpl-invoice-footer')
export class InvoiceFooterTpl extends LitElement {

  static override styles = css`
  $var__page__margin: 1cm 2cm 1cm 25mm;
  $var__innerPadding: .5cm;

  body {
    font-size: 12pt;
    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif !important;
    display: block;
    padding: $var__page__margin;
    padding-bottom: 0;
    font-size: 10pt;
    min-height: 88mm;
  }

  .tpl-invoice-footer {
    display: block;
    box-sizing: border-box;
    padding: $var__page__margin;
    padding-top: 0;
  }

  .invoice-footer__pageNumber {
    text-align: right;
    padding-top: 4.23mm;
    font-size: 10pt;
    margin-bottom: 4.23mm;
  }

  .invoice-footer__img {      
    display: flex;
    justify-content: end;
    padding-bottom: 0.2cm;
    padding-right: 2cm;
    padding-left: 2cm;
  }

  .invoice-footer__img-size {
    width: 110px;
    height: 70px;
  }

  .invoice-footer__details {
    text-align: center;
    font-size: 7pt;
  }

  .invoice-footer__line {
    span:not(:first-of-type)::before {
      content: '|';
      margin: .5em;
    }

    &:not(:first-of-type) {
      margin-top: .2em;
    }
  }
`;

  @property()
  invoice: Invoice = (window as any).providedData || invoiceSamples['invoice-001'];

  override render() {
    const imagePath = '/assets/icon/leya.png';
    const url = window.location.href.toString().includes('/dev/') ? `/dev${imagePath}` : `/print${imagePath}`;        
    const sender = this.invoice.sender;
    const bank = sender.bankDetails;

    return html`
    <Host>
      <div class="invoice-footer__img"><div class="invoice-footer__img-size"><leya-print-image-fetch .imgSrc=${url}/></div></div>
      <div class="invoice-footer__pageNumber">Page <span class="pageNumber">99</span>/<span class="totalPages">99</span></div>
      <div class="invoice-footer__details">
        <div class="invoice-footer__line invoice-footer__name">
          ${sender.address.company}
        </div>
        ${[
        line(
          ['Phone', sender.phone],
          ['Mail', sender.email],
          ['Web', sender.web],
        ),
      ]}
        <div class="invoice-footer__line invoice-footer__line__bank-details">
          Bank details: ${bank.name} IBAN: ${bank.iban} BIC: ${bank.bic}<br />
        </div>
      </div>
    </Host>`
  }
}

function line(...items: [label: string, value: any][]) {
  return html`<div class="invoice-footer__line">${items
    .filter(([_, value]) => !!value)
    .map(([label, value]) => html`<span><label>${label}:</label> ${value}</span>`)
    }</div>`;
}

declare global {
  interface HTMLElementTagNameMap {
    'tpl-invoice-footer': InvoiceFooterTpl;
  }
}