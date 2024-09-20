import { proxyCustomElement, HTMLElement, h, Host } from '@stencil/core/internal/client';

const _1WorkReportContentCss = "body{font-size:14pt;font-family:\"Lucida Sans\", \"Lucida Sans Regular\", \"Lucida Grande\", \"Lucida Sans Unicode\", Geneva, Verdana, sans-serif !important}tpl-work-report-content{display:block;box-sizing:border-box;border:1mm solid red;padding:0 1cm}.work-report__content-end{background:red;color:white;text-align:center;border:1px solid white}.work-report__content__spacer{margin:0.5cm 0;padding:0.5cm;border:1px solid green}";

const WorkReportContentTpl = /*@__PURE__*/ proxyCustomElement(class extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
  }
  render() {
    return h(Host, null, "content start", h("div", { class: "work-report__content__spacer", style: { height: '1000px' } }, "spacer"), new Array(20).fill(true).map((_, i) => {
      return h("section", null, h("h3", null, "Section ", i), h("p", null, "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet."));
    }), h("div", { class: "work-report__content-end" }, "content end"));
  }
  static get style() { return _1WorkReportContentCss; }
}, [0, "tpl-work-report-content"]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["tpl-work-report-content"];
  components.forEach(tagName => { switch (tagName) {
    case "tpl-work-report-content":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, WorkReportContentTpl);
      }
      break;
  } });
}

const TplWorkReportContent = WorkReportContentTpl;
const defineCustomElement = defineCustomElement$1;

export { TplWorkReportContent, defineCustomElement };
