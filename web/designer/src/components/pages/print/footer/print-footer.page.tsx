import { Component, h, Host, Prop } from '@stencil/core';

@Component({
  tag: 'print-footer-page',
})
export class PrintFooter {
  @Prop() tplName = 'invoice';

  render() {
    return <Host innerHTML={`<tpl-${this.tplName}-footer></tpl-${this.tplName}-footer>`}></Host>
  }
}
