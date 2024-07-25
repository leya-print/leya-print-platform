import { h, Host } from '@stencil/core';
export class WorkReportFooterTpl {
  render() {
    return h(Host, null, "work report footer");
  }
  static get is() { return "tpl-work-report-footer"; }
  static get originalStyleUrls() {
    return {
      "$": ["2-work-report-footer.scss"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["2-work-report-footer.css"]
    };
  }
}
