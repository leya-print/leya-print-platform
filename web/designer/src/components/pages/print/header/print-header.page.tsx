import { Component, h, Host, Prop } from '@stencil/core';

@Component({
  tag: 'print-header-page',
})
export class PrintHeader {
  @Prop() tplName = 'invoice';

  render() {
    return <Host innerHTML={`<tpl-${this.tplName}-header></tpl-${this.tplName}-header>`}></Host>
  }
}
