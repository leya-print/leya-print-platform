import { r as registerInstance, h, H as Host } from './index-11521ed9.js';

const _0WorkReportHeaderCss = "body{font-size:14pt;font-family:\"Lucida Sans\", \"Lucida Sans Regular\", \"Lucida Grande\", \"Lucida Sans Unicode\", Geneva, Verdana, sans-serif !important}tpl-work-report-header{display:block;min-height:3cm;box-sizing:border-box;border:1mm solid purple;padding:1cm}";

const WorkReportHeaderTpl = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
  }
  render() {
    return h(Host, null, "work report header");
  }
};
WorkReportHeaderTpl.style = _0WorkReportHeaderCss;

export { WorkReportHeaderTpl as tpl_work_report_header };
