import type { Invoice } from '@leya-print/common-api';
import { Component, h, Host, State } from '@stencil/core';
import { invoiceSamples } from './invoice-samples';

@Component({
  tag: 'tpl-invoice-header',
  styleUrl: '0-invoice-header.scss',
  shadow: false,
})
export class InvoiceHeaderTpl {
  @State() invoice: Invoice = (window as any).providedData || invoiceSamples['invoice-001'];
  render() {
    const invoice = this.invoice;
    return <Host>
      <div class="invoice-header__address-box">
        <div class="invoice-header__sender">
          <tplb-address-line address={invoice.sender.address}></tplb-address-line>
        </div>
        <div class="invoice-header__additions"></div>
        <div class="invoice-header__sendTo">
          <tplb-address address={invoice.recipient.address}></tplb-address>
        </div>
      </div>
      <div class="invoice-header__header-data">
        <div class="invoice-header__company">
          <tplb-address address={invoice.sender.address}></tplb-address>
          <div>USt-IdNr.: {invoice.sender.vatIdent}</div>
        </div>
        {invoice.customerReference && <div class="invoice-header__customer-reference">
          <h3><span><svg viewBox='0 0 60 10' xmlns="http://www.w3.org/2000/svg">
            <rect x1={0} y1={0} width={60} height={10} />
            <text x={4} y={7} fill="white" font-size={5} stroke="none">customer reference:</text>
          </svg></span></h3>
          <div class="invoice-header__customer-reference__content">
            {invoice.customerReference.split('\n').map((l) => <div>{l}</div>)}
          </div>
        </div>}
      </div>
      <div class="invoice-header__headline">
        <h2>Invoice {this.invoice.invoiceNo}</h2>
        <div class="invoice-header__date">
          {new Date(this.invoice.date).toLocaleDateString('en-US', { dateStyle: 'full' })}
        </div>
      </div>
      <div class="invoice-header__foldmark-1">&nbsp;</div>
      <div class="invoice-header__centermark">&nbsp;</div>
      <div class="invoice-header__foldmark-2">&nbsp;</div>
    </Host>
  }
}
