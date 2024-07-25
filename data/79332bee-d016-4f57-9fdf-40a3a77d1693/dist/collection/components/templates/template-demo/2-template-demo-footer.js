import { h, Host } from '@stencil/core';
export class TemplateDemoFooterTpl {
  render() {
    return h(Host, null, "template demo footer");
  }
  static get is() { return "tpl-template-demo-footer"; }
  static get originalStyleUrls() {
    return {
      "$": ["2-template-demo-footer.scss"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["2-template-demo-footer.css"]
    };
  }
}
