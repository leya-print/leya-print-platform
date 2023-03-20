import { r as registerInstance, h, H as Host } from './index-63403316.js';

const _2TemplateDemoFooterCss = "tpl-template-demo-footer{display:block;box-sizing:border-box;border:1mm solid blue;padding:1cm}";

const TemplateDemoFooterTpl = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
  }
  render() {
    return h(Host, null, "template demo footer");
  }
};
TemplateDemoFooterTpl.style = _2TemplateDemoFooterCss;

export { TemplateDemoFooterTpl as tpl_template_demo_footer };
