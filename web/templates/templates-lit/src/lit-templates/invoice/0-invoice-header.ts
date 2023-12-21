import {LitElement, html, css} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import { invoiceSamples } from './invoice-samples';
import { Invoice } from '../../models/invoice.model';

@customElement('tpl-invoice-header')
export class InvoiceHeaderTpl extends LitElement {
  static override styles = css`
    @import '0-invoice-header.scss';
  `;

  @property() 
  invoice: Invoice = (window as any).providedData || invoiceSamples['invoice-001'];

  @property({type: Number})
  count = 0;

  override render() {
    const invoice = this.invoice;  

    return html`
    <div class="invoice-header__address-box">
      <div class="invoice-header__sender">
        <tplb-address-line address=${invoice.sender.address}></tplb-address-line>
      </div>
      <div class="invoice-header__additions"></div>
      <div class="invoice-header__sendTo">
        <tplb-address address=${invoice.recipient.address}></tplb-address>
      </div>
    </div>
    <div class="invoice-header__header-data">
      <div class="invoice-header__company">
        <tplb-address address=${invoice.sender.address}></tplb-address>
        <div>USt-IdNr.: ${invoice.sender.vatIdent}</div>
      </div>
      ${invoice.customerReference && html`<div class="invoice-header__customer-reference">
        <h3><span><svg viewBox='0 0 60 10' xmlns="http://www.w3.org/2000/svg">
          <rect x1={0} y1={0} width={60} height={10} />
          <text x={4} y={7} fill="white" font-size={5} stroke="none">customer reference:</text>
        </svg></span></h3>
        <div class="invoice-header__customer-reference__content">
          ${invoice.customerReference?.split('\n').map((l) => `<div>${l}</div>`)}
        </div>
      </div>`
      }
    </div>
    <div class="invoice-header__headline">
      <h2>Invoice ${this.invoice.invoiceNo}</h2>
      <div class="invoice-header__date">
        {new Date(${this.invoice.date}).toLocaleDateString('en-US', { dateStyle: 'full' })}
      </div>
    </div>
    <div class="invoice-header__foldmark-1">&nbsp;</div>
    <div class="invoice-header__centermark">&nbsp;</div>
    <div class="invoice-header__foldmark-2">&nbsp;</div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'tpl-invoice-header': InvoiceHeaderTpl;
  }
}
