import { Component, h, Host } from '@stencil/core';

@Component({
  tag: 'tpl-work-report-header',
  styleUrl: '0-work-report-header.scss',
  shadow: false,
})
export class WorkReportHeaderTpl {
  render() {
    return <Host>work report header</Host>
  }
}
