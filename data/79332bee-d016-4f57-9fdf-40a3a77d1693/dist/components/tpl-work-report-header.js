import { proxyCustomElement, HTMLElement, h, Host } from '@stencil/core/internal/client';

const _0WorkReportHeaderCss = "body{font-size:14pt;font-family:\"Lucida Sans\", \"Lucida Sans Regular\", \"Lucida Grande\", \"Lucida Sans Unicode\", Geneva, Verdana, sans-serif !important}tpl-work-report-header{display:block;min-height:3cm;box-sizing:border-box;border:1mm solid purple;padding:1cm}";

const WorkReportHeaderTpl = /*@__PURE__*/ proxyCustomElement(class extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
  }
  render() {
    return h(Host, null, "work report header");
  }
  static get style() { return _0WorkReportHeaderCss; }
}, [0, "tpl-work-report-header"]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["tpl-work-report-header"];
  components.forEach(tagName => { switch (tagName) {
    case "tpl-work-report-header":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, WorkReportHeaderTpl);
      }
      break;
  } });
}

const TplWorkReportHeader = WorkReportHeaderTpl;
const defineCustomElement = defineCustomElement$1;

export { TplWorkReportHeader, defineCustomElement };
