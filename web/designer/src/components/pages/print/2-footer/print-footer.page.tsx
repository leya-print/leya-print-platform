import { Component, h, Host, Prop } from '@stencil/core';

@Component({
  tag: 'print-footer-page',
  styleUrl: 'print-footer.page.scss',
})
export class PrintFooter {
  @Prop() tplName = 'invoice';

  render() {
    return <Host innerHTML={`<graph-paper></graph-paper><tpl-${this.tplName}-footer></tpl-${this.tplName}-footer>`}></Host>
  }
}
