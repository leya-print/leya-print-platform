import { Component, h, Host } from '@stencil/core';

@Component({
  tag: 'tpl-invoice-header',
  styleUrl: '0-invoice-header.scss',
  shadow: false,
})
export class InvoiceHeaderTpl {
  render() {
    return <Host>invoice header</Host>
  }
}
