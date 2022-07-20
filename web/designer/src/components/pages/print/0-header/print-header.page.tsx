import { Component, h, Host, Prop } from '@stencil/core';

@Component({
  tag: 'print-header-page',
  styleUrl: 'print-header.page.scss',
  shadow: false,
})
export class PrintHeader {
  @Prop() tplName = 'invoice';

  render() {
    return <Host
      style={{
        width: '21cm',
      }}
      innerHTML={`<graph-paper></graph-paper><tpl-${this.tplName}-header></tpl-${this.tplName}-header>`}
    ></Host>
  }
}
