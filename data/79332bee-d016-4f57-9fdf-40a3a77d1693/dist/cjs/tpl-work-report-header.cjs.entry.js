'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-90772d73.js');

const _0WorkReportHeaderCss = "body{font-size:14pt;font-family:\"Lucida Sans\", \"Lucida Sans Regular\", \"Lucida Grande\", \"Lucida Sans Unicode\", Geneva, Verdana, sans-serif !important}tpl-work-report-header{display:block;min-height:3cm;box-sizing:border-box;border:1mm solid purple;padding:1cm}";

const WorkReportHeaderTpl = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
  }
  render() {
    return index.h(index.Host, null, "work report header");
  }
};
WorkReportHeaderTpl.style = _0WorkReportHeaderCss;

exports.tpl_work_report_header = WorkReportHeaderTpl;
