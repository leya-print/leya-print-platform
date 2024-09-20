import { proxyCustomElement, HTMLElement, h, Host } from '@stencil/core/internal/client';

const _2WorkReportFooterCss = "tpl-work-report-footer{display:block;box-sizing:border-box;border:1mm solid blue;padding:1cm}";

const WorkReportFooterTpl = /*@__PURE__*/ proxyCustomElement(class extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
  }
  render() {
    return h(Host, null, "work report footer");
  }
  static get style() { return _2WorkReportFooterCss; }
}, [0, "tpl-work-report-footer"]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["tpl-work-report-footer"];
  components.forEach(tagName => { switch (tagName) {
    case "tpl-work-report-footer":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, WorkReportFooterTpl);
      }
      break;
  } });
}

const TplWorkReportFooter = WorkReportFooterTpl;
const defineCustomElement = defineCustomElement$1;

export { TplWorkReportFooter, defineCustomElement };
