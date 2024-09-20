import { proxyCustomElement, HTMLElement, h, Host } from '@stencil/core/internal/client';

const _2TemplateDemoFooterCss = "tpl-template-demo-footer{display:block;box-sizing:border-box;border:1mm solid blue;padding:1cm}";

const TemplateDemoFooterTpl = /*@__PURE__*/ proxyCustomElement(class extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
  }
  render() {
    return h(Host, null, "template demo footer");
  }
  static get style() { return _2TemplateDemoFooterCss; }
}, [0, "tpl-template-demo-footer"]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["tpl-template-demo-footer"];
  components.forEach(tagName => { switch (tagName) {
    case "tpl-template-demo-footer":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, TemplateDemoFooterTpl);
      }
      break;
  } });
}

const TplTemplateDemoFooter = TemplateDemoFooterTpl;
const defineCustomElement = defineCustomElement$1;

export { TplTemplateDemoFooter, defineCustomElement };
