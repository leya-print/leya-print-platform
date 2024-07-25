import { h, Host } from '@stencil/core';
export class WorkReportHeaderTpl {
  render() {
    return h(Host, null, "work report header");
  }
  static get is() { return "tpl-work-report-header"; }
  static get originalStyleUrls() {
    return {
      "$": ["0-work-report-header.scss"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["0-work-report-header.css"]
    };
  }
}
