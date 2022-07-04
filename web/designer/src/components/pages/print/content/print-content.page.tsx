import { Component, h, Host, Prop } from '@stencil/core';

@Component({
  tag: 'print-content-page',
})
export class PrintContentPage {
  @Prop() tplName = 'invoice';

  render() {
    return <Host innerHTML={`<tpl-${this.tplName}-content></tpl-${this.tplName}-content>`}></Host>
  }
}
