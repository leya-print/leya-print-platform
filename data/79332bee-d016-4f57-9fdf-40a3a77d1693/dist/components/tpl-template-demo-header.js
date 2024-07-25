import { proxyCustomElement, HTMLElement, h, Host } from '@stencil/core/internal/client';

const _0TemplateDemoHeaderCss = "body{font-size:14pt;font-family:\"Lucida Sans\", \"Lucida Sans Regular\", \"Lucida Grande\", \"Lucida Sans Unicode\", Geneva, Verdana, sans-serif !important}tpl-template-demo-header{display:block;min-height:3cm;box-sizing:border-box;border:1mm solid purple;padding:1cm}";

const TemplateDemoHeaderTpl = /*@__PURE__*/ proxyCustomElement(class extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
  }
  render() {
    return h(Host, null, "template demo header");
  }
  static get style() { return _0TemplateDemoHeaderCss; }
}, [0, "tpl-template-demo-header"]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["tpl-template-demo-header"];
  components.forEach(tagName => { switch (tagName) {
    case "tpl-template-demo-header":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, TemplateDemoHeaderTpl);
      }
      break;
  } });
}

const TplTemplateDemoHeader = TemplateDemoHeaderTpl;
const defineCustomElement = defineCustomElement$1;

export { TplTemplateDemoHeader, defineCustomElement };
