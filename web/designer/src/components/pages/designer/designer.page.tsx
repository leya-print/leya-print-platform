import { Component, h, Host, Prop } from '@stencil/core';

@Component({
  tag: 'designer-page',
  styleUrl: 'designer.page.scss',
  shadow: true,
})
export class AppHome {
  @Prop() tplName = 'invoice';

  render() {
    return <Host>
      <h1>Designer</h1>
      <designer-stage>
        <div slot="stage-header" innerHTML={`<tpl-${this.tplName}-header></tpl-${this.tplName}-header>`}></div>
        <div slot="stage-content" innerHTML={`<tpl-${this.tplName}-content></tpl-${this.tplName}-content>`}></div>
        <div slot="stage-footer" innerHTML={`<tpl-${this.tplName}-footer></tpl-${this.tplName}-footer>`}></div>
      </designer-stage>
    </Host>;
  }
}
