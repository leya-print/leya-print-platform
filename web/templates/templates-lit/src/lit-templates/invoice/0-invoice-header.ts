import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { invoiceSamples } from './invoice-samples';
import { Invoice } from '../../models/invoice.model';
import '../template-blocks/address/address-line.component'
import '../template-blocks/address/address.component'

@customElement('tpl-invoice-header')
export class InvoiceHeaderTpl extends LitElement {

  static override styles = css`
    $var__page__margin: 1cm 2cm 1cm 25mm;
    $var__innerPadding: .5cm;
    $ensure-sender-is-readable: 3mm;    

    body {
      font-size: 12pt;
      font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif !important;
      display: block;
      padding: $var__page__margin;
      padding-bottom: 0;
      font-size: 10pt;
      min-height: 88mm;
    }

    .invoice-header__address-box {
      position: absolute;
      display: flex;
      flex-direction: column;
      top: 27mm + $ensure-sender-is-readable;
      left: 20mm;
      width: 85mm;
      height: 45mm - $ensure-sender-is-readable;
      box-sizing: border-box;
      padding-left: 5mm;
      border: 1px solid darkgray;
      border-style: dotted;
      border-radius: 5px;
    }
      
    .invoice-header__sender {
      display: flex;
      height: 5mm;
      width: 80mm;

      tplb-address-line {
        flex-shrink: 1;
        font-size: 7pt;
      }
    }

    .invoice-header__additions {
      height: 12.7mm - $ensure-sender-is-readable;
    }

    .invoice-header__sendTo {
      height: 27.3mm;
    }
    
    .tplb-address-company {
      font-weight: bold;
    }

    .invoice-header__header-data {
      min-height: 40mm + 32mm - 10mm;
      margin-left: 115mm;
      margin-bottom: 8.46mm;
      margin-right: -10mm;
      max-width: 75mm;
    }

    tplb-address {
      display: block;
      margin-bottom: 1em;             
    }

    .invoice-header__customer-reference {
      display: inline-flex;
      flex-direction: column;
      $customer-referance-padding: .3em;

      margin-top: 2em;
      border: 1px solid red;
      padding: 0;
    }

    .invoice-header__customer-reference__content {
      padding: $customer-referance-padding;
    }

    h3 {
      display: block;
      color: white;
      margin-top: 0;
      margin-bottom: $customer-referance-padding;

      span:first-child {
        display: block;
        overflow: hidden;
        width: calc(5.7cm - 2px);
        height: calc(1em + 2.5 * $customer-referance-padding);
        svg {
          width: calc(5.7cm - 2px);
          fill: red;
          stroke: red;
        }
      }
      
      span:last-child {
        display: block;
        padding: $customer-referance-padding;
        padding-bottom: math.div($customer-referance-padding, 2);
      }
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
      top: 87mm - .1mm;
      width: 5mm;
      height: 0;
      overflow: hidden;
      border-bottom: .2mm solid black;
    }
  
    .invoice-header__centermark {
      position: absolute;
      left: 0mm;
      top: 148.5mm - .2mm;
      width: 10mm;
      height: 0;
      overflow: hidden;
      border-bottom: .4mm solid black;
    }

    .invoice-header__foldmark-2 {
      position: absolute;
      left: 0mm;
      top: 87mm + 105mm - .1mm;
      width: 5mm;
      height: 0;
      overflow: hidden;
      border-bottom: .2mm solid black;
    }

    .invoice-header__img{
      display: flex;
      justify-content: end;
      padding-bottom: 0.2cm;
      padding-right: 2cm;
      padding-left: 2cm;
    }

    .invoice-header__img-size{
      width: 110px;
      height: 70px;
    }
  `;

  @property()
  invoice: Invoice = (window as any).providedData || invoiceSamples['invoice-001'];

  override render() {
    const invoice = this.invoice;

    return html`
    <div class="invoice-header__address-box">
      <div class="invoice-header__sender">
        <tplb-address-line .address=${invoice.sender.address}></tplb-address-line>
      </div>
      <div class="invoice-header__additions"></div>
      <div class="invoice-header__sendTo">
        <tplb-address .address=${invoice.recipient.address}></tplb-address>
      </div>
    </div>
    <div class="invoice-header__header-data">
      <div class="invoice-header__company">
        <tplb-address address=${invoice.sender.address}></tplb-address>
        <div>USt-IdNr.: ${invoice.sender.vatIdent}</div>
      </div>
      ${invoice.customerReference && html`<div class="invoice-header__customer-reference">
        <h3><span><svg viewBox='0 0 60 10' xmlns="http://www.w3.org/2000/svg">
          <rect x1=${0} y1=${0} width=${60} height=${10} />
          <text x=${4} y=${7} fill="white" font-size=${5} stroke="none">customer reference:</text>
        </svg></span></h3>
        <div class="invoice-header__customer-reference__content">
          ${invoice.customerReference?.split('\n').map((l) => html`<div>${l}</div>`)}
        </div>
      </div>`
      }    
    </div>
    <div class="invoice-header__headline">
      <h2>Invoice ${this.invoice.invoiceNo}</h2>
      <div class="invoice-header__date">
        ${new Date(this.invoice.date).toLocaleDateString('en-US', { dateStyle: 'full' })}
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
