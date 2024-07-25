'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-90772d73.js');

const _0TemplateDemoHeaderCss = "body{font-size:14pt;font-family:\"Lucida Sans\", \"Lucida Sans Regular\", \"Lucida Grande\", \"Lucida Sans Unicode\", Geneva, Verdana, sans-serif !important}tpl-template-demo-header{display:block;min-height:3cm;box-sizing:border-box;border:1mm solid purple;padding:1cm}";

const TemplateDemoHeaderTpl = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
  }
  render() {
    return index.h(index.Host, null, "template demo header");
  }
};
TemplateDemoHeaderTpl.style = _0TemplateDemoHeaderCss;

exports.tpl_template_demo_header = TemplateDemoHeaderTpl;
