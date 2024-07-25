import { proxyCustomElement, HTMLElement, h, Host } from '@stencil/core/internal/client';

const _1TemplateDemoContentCss = "body{font-size:14pt;font-family:\"Lucida Sans\", \"Lucida Sans Regular\", \"Lucida Grande\", \"Lucida Sans Unicode\", Geneva, Verdana, sans-serif !important}tpl-template-demo-content{display:block;box-sizing:border-box;border:1mm solid red;padding:0 1cm}.template-demo__content-end{background:red;color:white;text-align:center;border:1px solid white}.template-demo__content__spacer{margin:0.5cm 0;padding:0.5cm;border:1px solid green}";

const TemplateDemoContentTpl = /*@__PURE__*/ proxyCustomElement(class extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
  }
  render() {
    return h(Host, null, "content start", h("div", { class: "template-demo__content__spacer", style: { height: '1000px' } }, "spacer"), new Array(20).fill(true).map((_, i) => {
      return h("section", null, h("h3", null, "Section ", i), h("p", null, "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet."));
    }), h("div", { class: "template-demo__content-end" }, "content end"));
  }
  static get style() { return _1TemplateDemoContentCss; }
}, [0, "tpl-template-demo-content"]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["tpl-template-demo-content"];
  components.forEach(tagName => { switch (tagName) {
    case "tpl-template-demo-content":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, TemplateDemoContentTpl);
      }
      break;
  } });
}

const TplTemplateDemoContent = TemplateDemoContentTpl;
const defineCustomElement = defineCustomElement$1;

export { TplTemplateDemoContent, defineCustomElement };
