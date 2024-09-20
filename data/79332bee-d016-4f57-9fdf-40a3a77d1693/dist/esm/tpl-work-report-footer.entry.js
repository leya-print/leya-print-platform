import { r as registerInstance, h, H as Host } from './index-11521ed9.js';

const _2WorkReportFooterCss = "tpl-work-report-footer{display:block;box-sizing:border-box;border:1mm solid blue;padding:1cm}";

const WorkReportFooterTpl = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
  }
  render() {
    return h(Host, null, "work report footer");
  }
};
WorkReportFooterTpl.style = _2WorkReportFooterCss;

export { WorkReportFooterTpl as tpl_work_report_footer };
