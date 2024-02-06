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
        font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif !important;
        display: block;
        padding: 1cm 2cm 1cm 25mm;
        padding-bottom: 0;
        font-size: 10pt;
        min-height: 88mm;
      }
      
      @media print {
        @page {
          margin-left: 20mm;
        }
      }
    
      .invoice-header__sender {
        display: flex;
        height: 5mm;
        width: 80mm;   
      }
    
      .tplb-address-line {
        flex-shrink: 1;
        font-size: 7pt;
      }
    
      .invoice-header__additions {
        height: calc(12.7mm - #{$3mm});
      }
    
      .invoice-header__sendTo {
        height: 27.3mm;
      }
    
      .invoice-header__header-data {
        min-height: calc(40mm + 32mm - 10mm);
        margin-left: 115mm;
        margin-bottom: 8.46mm;
        margin-right: -10mm;
        max-width: 75mm;
      }
    
      .invoice-header__company {
        display: block;
        margin-bottom: 1em;
      }
    
      .tplb-address-company {
        font-weight: bold;
      }
    
      .invoice-header__customer-reference {
        display: inline-flex;
        flex-direction: column;
        padding: .3em;
    
        margin-top: 2em;
        border: 1px solid red;
        padding: 0;
      }
    
      h3 {
        display: block;
        color: white;
        margin-top: 0;
        margin-bottom: .3em;   
      }
    
      span:first-child {
        display: block;
        overflow: hidden;
        width: calc(5.7cm - 2px);
        height: calc(1em + 2.5 * .3em);
        svg {
          width: calc(5.7cm - 2px);
          fill: red;
          stroke: red;
        }
      }
    
      span:last-child {
        display: block;
        padding: .3em;
        padding-bottom: math.div(.3em, 2);
      }
    
      .invoice-header__customer-reference__content {
        padding: .3em;
      }
      
      .invoice-header__address-box {
        position: absolute;
        display: flex;
        flex-direction: column;
        top: calc(27mm + #{$3mm});
        left: 20mm;
        width: 85mm;
        height: calc(45mm - #{$3mm});
        box-sizing: border-box;
        padding-left: 5mm;
        border: 1px solid darkgray;
        border-style: dotted;
        border-radius: 5px;
      }
    
      .invoice-header__headline {
        display: flex;
        justify-content: space-between;
        align-items: baseline;
      }
    
      h2 {
        margin-top: 1cm;
        margin-bottom: .5cm;
      }
    
      .invoice-header__foldmark-1 {
        position: absolute;
        left: 0mm;
        top: calc(87mm - .1mm);
        width: 5mm;
        height: 0;
        overflow: hidden;
        border-bottom: .2mm solid black;
      }
    
      .invoice-header__centermark {
        position: absolute;
        left: 0mm;
        top: calc(148.5mm - .2mm);
        width: 10mm;
        height: 0;
        overflow: hidden;
        border-bottom: .4mm solid black;
      }
    
      .invoice-header__foldmark-2 {
        position: absolute;
        left: 0mm;
        top: calc(87mm + 105mm - .1mm);
        width: 5mm;
        height: 0;
        overflow: hidden;
        border-bottom: .2mm solid black;
      }
    
      .invoice-header__img {
        display: flex;
        justify-content: flex-end;
        padding-bottom: 0.2cm;
        padding-right: 2cm;
        padding-left: 2cm;
        padding-top: 1cm;
      }
    
      .invoice-header__img-size {
        width: 110px;
        height: 70px;
      }
  </style>
    <Host>
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
