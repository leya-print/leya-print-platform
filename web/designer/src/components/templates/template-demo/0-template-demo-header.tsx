import { Component, h, Host } from '@stencil/core';

@Component({
  tag: 'tpl-template-demo-header',
  styleUrl: '0-template-demo-header.scss',
  shadow: false,
})
export class TemplateDemoHeaderTpl {
  render() {
    return <Host>template demo header</Host>
  }
}
