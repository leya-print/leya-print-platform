import { h, Host } from '@stencil/core';
export class TemplateDemoHeaderTpl {
  render() {
    return h(Host, null, "template demo header");
  }
  static get is() { return "tpl-template-demo-header"; }
  static get originalStyleUrls() {
    return {
      "$": ["0-template-demo-header.scss"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["0-template-demo-header.css"]
    };
  }
}
