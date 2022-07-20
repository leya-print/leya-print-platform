import { Component, h, Host, Prop } from '@stencil/core';

@Component({
  tag: 'print-content-page',
  styleUrl: 'print-content.page.scss',
  shadow: false,
})
export class PrintContentPage {
  @Prop() tplName = 'invoice';

  render() {
    return <Host innerHTML={`<graph-paper></graph-paper><tpl-${this.tplName}-content></tpl-${this.tplName}-content>`}></Host>
  }
}
