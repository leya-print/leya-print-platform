import { Component, h, Host, Prop } from '@stencil/core';
import { templatePackageService } from 'src/global/template-package.service';
import '@leya-print/web-common/dist/components/leya-print-graph-paper';

@Component({
  tag: 'print-header-page',
  styleUrl: 'print-header.page.scss',
  shadow: false,
})
export class PrintHeader {
  @Prop() tplName: string;
  @Prop() tplPackage?: string;

  async componentWillLoad() {
    await templatePackageService.defineCustomElements(this.tplPackage);
  }

  render() {
    return <Host
      style={{
        width: '21cm',
      }}
      innerHTML={`<leya-print-graph-paper></leya-print-graph-paper><tpl-${this.tplName}-header></tpl-${this.tplName}-header>`}
    ></Host>
  }
}
