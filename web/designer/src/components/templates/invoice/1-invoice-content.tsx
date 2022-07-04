import { Component, h, Host } from '@stencil/core';

@Component({
  tag: 'tpl-invoice-content'
})
export class InvoiceContentTpl {
  render() {
    return <Host>
      content start
      <div style={{height: '1000px', border: '1px solid green' }}>
        spacer
      </div>
      content end
    </Host>
  }
}
