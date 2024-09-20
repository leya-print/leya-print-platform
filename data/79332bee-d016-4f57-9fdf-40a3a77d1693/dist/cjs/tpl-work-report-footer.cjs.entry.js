'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-90772d73.js');

const _2WorkReportFooterCss = "tpl-work-report-footer{display:block;box-sizing:border-box;border:1mm solid blue;padding:1cm}";

const WorkReportFooterTpl = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
  }
  render() {
    return index.h(index.Host, null, "work report footer");
  }
};
WorkReportFooterTpl.style = _2WorkReportFooterCss;

exports.tpl_work_report_footer = WorkReportFooterTpl;
