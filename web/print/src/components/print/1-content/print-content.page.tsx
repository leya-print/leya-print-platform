import { Component, h, Host, Prop } from '@stencil/core';
import { templatePackageService } from 'src/global/template-package.service';

@Component({
  tag: 'print-content-page',
  styleUrl: 'print-content.page.scss',
  shadow: false,
})
export class PrintContentPage {
  @Prop() tplName: string;
  @Prop() tplPackage?: string;

  async componentWillLoad() {
    await templatePackageService.defineCustomElements(this.tplPackage);
  }

  render() {
    return <Host innerHTML={`<leya-print-watermark></leya-print-watermark>
    <leya-print-graph-paper></leya-print-graph-paper><tpl-${this.tplName}-content></tpl-${this.tplName}-content>`}></Host>
  }
}
