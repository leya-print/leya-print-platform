import { Component, h, Host } from '@stencil/core';

@Component({
  tag: 'tpl-invoice-footer',
  styleUrl: '2-invoice-footer.scss',
})
export class InvoiceFooterTpl {
  render() {
    return <Host>
      <div class="invoice-footer__pageNumber">page <span class="pageNumber">99</span>/<span class="totalPages">99</span></div>
      invoice footer
    </Host>
  }
}
