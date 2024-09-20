import { r as registerInstance, h, H as Host } from './index-11521ed9.js';

const _0TemplateDemoHeaderCss = "body{font-size:14pt;font-family:\"Lucida Sans\", \"Lucida Sans Regular\", \"Lucida Grande\", \"Lucida Sans Unicode\", Geneva, Verdana, sans-serif !important}tpl-template-demo-header{display:block;min-height:3cm;box-sizing:border-box;border:1mm solid purple;padding:1cm}";

const TemplateDemoHeaderTpl = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
  }
  render() {
    return h(Host, null, "template demo header");
  }
};
TemplateDemoHeaderTpl.style = _0TemplateDemoHeaderCss;

export { TemplateDemoHeaderTpl as tpl_template_demo_header };
