import type { Invoice } from '../../../models/invoice.model';
import { Component, h, Host, State } from '@stencil/core';
import { invoiceSamples } from './invoice-samples';

@Component({
  tag: 'tpl-invoice-footer',
  styleUrl: '2-invoice-footer.scss',
})
export class InvoiceFooterTpl {
  @State() invoice: Invoice = (window as any).providedData || invoiceSamples['invoice-001'];
  render() {
    const imagePath = 'assets/leya.png';    

    const sender = this.invoice.sender;
    const bank = sender.bankDetails;
    return <Host>
      <div class="invoice-footer__img"><div class="invoice-footer__img-size"><leya-print-image-fetch imgSrc={imagePath} /></div></div>
      <div class="invoice-footer__pageNumber">Page <span class="pageNumber">99</span>/<span class="totalPages">99</span></div>
      <div class="invoice-footer__details">
        <div class="invoice-footer__line invoice-footer__name">
          {sender.address.company}
        </div>
        {[
          line(
            ['Phone', sender.phone],
            ['Mail', sender.email],
            ['Web', sender.web],
          ),
        ]}
        <div class="invoice-footer__line invoice-footer__line__bank-details">
          Bank details: {bank.name} IBAN: {bank.iban} BIC: {bank.bic}<br />
        </div>
      </div>
    </Host>
  }
}

function line(...items: [label: string, value: any][]) {
  return <div class="invoice-footer__line">{items
    .filter(([_, value]) => !!value)
    .map(([label, value]) => <span><label>{label}:</label> {value}</span>)
  }</div>;
}
