import { Component, h, Host } from '@stencil/core';

@Component({
  tag: 'tpl-template-demo-footer',
  styleUrl: '2-template-demo-footer.scss',
})
export class TemplateDemoFooterTpl {
  render() {
    return <Host>template demo footer</Host>
  }
}
