import {LitElement, html} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {invoiceSamples} from './invoice-samples';
import {Invoice} from '../../models/invoice.model';
import '../template-blocks/address/address-line.component';
import '../template-blocks/address/address.component';

@customElement('tpl-invoice-header')
export class InvoiceHeaderTpl extends LitElement {
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
    const invoice = this.invoice;
    const imagePath = '/assets/icon/leya.png';
    const url = window.location.href.toString().includes('/dev/')
      ? `/dev${imagePath}`
      : `/print${imagePath}`;

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
    tpl-invoice-header {
      font-size: 12pt;
      font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande", "Lucida Sans Unicode", Geneva, Verdana, sans-serif !important;
      display: block;
      padding: 1cm 2cm 1cm 25mm;
      padding-bottom: 0;
      font-size: 10pt;
      min-height: 88mm;
    }
    tpl-invoice-header .invoice-header__address-box {
      position: absolute;
      display: flex;
      flex-direction: column;
      top: 30mm;
      left: 20mm;
      width: 85mm;
      height: 42mm;
      box-sizing: border-box;
      padding-left: 5mm;
      border: 1px solid darkgray;
      border-style: dotted;
      border-radius: 5px;
    }
    tpl-invoice-header .invoice-header__address-box .invoice-header__sender {
      display: flex;
      height: 5mm;
      width: 80mm;
    }
    tpl-invoice-header .invoice-header__address-box .invoice-header__sender tplb-address-line {
      flex-shrink: 1;
      font-size: 7pt;
    }
    tpl-invoice-header .invoice-header__address-box .invoice-header__additions {
      height: 9.7mm;
    }
    tpl-invoice-header .invoice-header__address-box .invoice-header__sendTo {
      height: 27.3mm;
    }
    tpl-invoice-header .invoice-header__header-data {
      min-height: 62mm;
      margin-left: 115mm;
      margin-bottom: 8.46mm;
      margin-right: -10mm;
      max-width: 75mm;
    }
    tpl-invoice-header .invoice-header__header-data .invoice-header__company tplb-address {
      display: block;
      margin-bottom: 1em;
    }
    tpl-invoice-header .invoice-header__header-data .invoice-header__company tplb-address .tplb-address-company {
      font-weight: bold;
    }
    tpl-invoice-header .invoice-header__header-data .invoice-header__customer-reference {
      display: inline-flex;
      flex-direction: column;
      margin-top: 2em;
      border: 1px solid red;
      padding: 0;
    }
    tpl-invoice-header .invoice-header__header-data .invoice-header__customer-reference h3 {
      display: block;
      color: white;
      margin-top: 0;
      margin-bottom: 0.3em;
    }
    tpl-invoice-header .invoice-header__header-data .invoice-header__customer-reference h3 span:first-child {
      display: block;
      overflow: hidden;
      width: 5.6470833333cm;
      height: 1.75em;
    }
    tpl-invoice-header .invoice-header__header-data .invoice-header__customer-reference h3 span:first-child svg {
      width: 5.6470833333cm;
      fill: red;
      stroke: red;
    }
    tpl-invoice-header .invoice-header__header-data .invoice-header__customer-reference h3 span:last-child {
      display: block;
      padding: 0.3em;
      padding-bottom: 0.15em;
    }
    tpl-invoice-header .invoice-header__header-data .invoice-header__customer-reference .invoice-header__customer-reference__content {
      padding: 0.3em;
    }
    tpl-invoice-header .invoice-header__headline {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
    }
    tpl-invoice-header .invoice-header__headline h2 {
      margin-top: 1cm;
      margin-bottom: 0.5cm;
    }
    tpl-invoice-header .invoice-header__foldmark-1 {
      position: absolute;
      left: 0mm;
      top: 86.9mm;
      width: 5mm;
      height: 0;
      overflow: hidden;
      border-bottom: 0.2mm solid black;
    }
    tpl-invoice-header .invoice-header__centermark {
      position: absolute;
      left: 0mm;
      top: 148.3mm;
      width: 10mm;
      height: 0;
      overflow: hidden;
      border-bottom: 0.4mm solid black;
    }
    tpl-invoice-header .invoice-header__foldmark-2 {
      position: absolute;
      left: 0mm;
      top: 191.9mm;
      width: 5mm;
      height: 0;
      overflow: hidden;
      border-bottom: 0.2mm solid black;
    }
    tpl-invoice-header .invoice-header__img {
      display: flex;
      justify-content: end;
      padding-bottom: 0.2cm;
      padding-right: 2cm;
      padding-left: 2cm;
    }
    tpl-invoice-header .invoice-header__img-size {
      width: 110px;
      height: 70px;
    }
    
    /*# sourceMappingURL=0-invoice-header.css.map */    
  </style>
    <Host class="invoice__header-body">
      <div class="invoice-header__img">
        <div class="invoice-header__img-size">
          <leya-print-image-fetch .imgSrc=${url} />
        </div>
      </div>
      <div class="invoice-header__address-box">
        <div class="invoice-header__sender">
          <tplb-address-line class="tplb-address-line"
            .address=${invoice.sender.address}
          ></tplb-address-line>
        </div>
        <div class="invoice-header__additions"></div>
        <div class="invoice-header__sendTo">
          <tplb-address class="tplb-address" .address=${invoice.recipient.address}></tplb-address>
        </div>
      </div>
      <div class="invoice-header__header-data">
        <div class="invoice-header__company">
          <tplb-address class="tplb-address" .address=${invoice.sender.address}></tplb-address>
          <div>USt-IdNr.: ${invoice.sender.vatIdent}</div>
        </div>
        ${invoice.customerReference &&
        html`<div class="invoice-header__customer-reference">
          <h3>
            <span
              ><svg viewBox="0 0 60 10" xmlns="http://www.w3.org/2000/svg">
                <rect x1=${0} y1=${0} width=${60} height=${10} />
                <text x=${4} y=${7} fill="white" font-size=${5} stroke="none">
                  customer reference:
                </text>
              </svg></span
            >
          </h3>
          <div class="invoice-header__customer-reference__content">
            ${invoice.customerReference
              ?.split('\n')
              .map((l) => html`<div>${l}</div>`)}
          </div>
        </div>`}
      </div>
      <div class="invoice-header__headline">
        <h2>Invoice ${this.invoice.invoiceNo}</h2>
        <div class="invoice-header__date">
          ${new Date(this.invoice.date).toLocaleDateString('en-US', {
            dateStyle: 'full',
          })}
        </div>
      </div>
      <div class="invoice-header__foldmark-1">&nbsp;</div>
      <div class="invoice-header__centermark">&nbsp;</div>
      <div class="invoice-header__foldmark-2">&nbsp;</div>
    </Host>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'tpl-invoice-header': InvoiceHeaderTpl;
  }
}
