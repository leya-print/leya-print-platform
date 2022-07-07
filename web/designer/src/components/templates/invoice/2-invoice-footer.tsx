import { Component, h, Host } from '@stencil/core';

@Component({
  tag: 'tpl-invoice-footer',
  styleUrl: '2-invoice-footer.scss',
})
export class InvoiceFooterTpl {
  render() {
    return <Host>invoice footer</Host>
  }
}
