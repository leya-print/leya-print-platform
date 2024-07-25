'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-90772d73.js');

const _2TemplateDemoFooterCss = "tpl-template-demo-footer{display:block;box-sizing:border-box;border:1mm solid blue;padding:1cm}";

const TemplateDemoFooterTpl = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
  }
  render() {
    return index.h(index.Host, null, "template demo footer");
  }
};
TemplateDemoFooterTpl.style = _2TemplateDemoFooterCss;

exports.tpl_template_demo_footer = TemplateDemoFooterTpl;
