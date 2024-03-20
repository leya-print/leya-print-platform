import {LitElement, html, unsafeCSS} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {Invoice} from '../../models/invoice.model';
import {invoiceSamples} from './invoice-samples';

@customElement('tpl-invoice-footer')
export class InvoiceFooterTpl extends LitElement {
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
    const imagePath = '/assets/icon/leya.png';
    const url = window.location.href.toString().includes('/dev/')
      ? `/dev${imagePath}`
      : `/print${imagePath}`;
    const sender = this.invoice.sender;
    const bank = sender.bankDetails;

    return html`
    <style>
      ${unsafeCSS(require("./2-invoice-footer.scss"))}
    </style>
    <Host class="invoice-footer__body">
      <div class="invoice-footer__img">
        <div class="invoice-footer__img-size">
          <leya-print-image-fetch .imgSrc=${url} />
        </div>
      </div>
      <div class="invoice-footer__pageNumber">
        Page <span>99</span>/<span>99</span>
      </div>
      <div class="invoice-footer__details">
        <div class="invoice-footer__line invoice-footer__name">
          ${sender.address.company}
        </div>
        ${[
          line(
            ['Phone', sender.phone],
            ['Mail', sender.email],
            ['Web', sender.web]
          ),
        ]}
        <div class="invoice-footer__line invoice-footer__line__bank-details">
          Bank details: ${bank.name} IBAN: ${bank.iban} BIC: ${bank.bic}<br />
        </div>
      </div>
    </Host>`;
  }
}

function line(...items: [label: string, value: any][]) {
  return html`<div class="invoice-footer__line">
    ${items
      .filter(([_, value]) => !!value)
      .map(
        ([label, value]) => html`<span><label>${label}:</label> ${value}</span>`
      )}
  </div>`;
}

declare global {
  interface HTMLElementTagNameMap {
    'tpl-invoice-footer': InvoiceFooterTpl;
  }
}