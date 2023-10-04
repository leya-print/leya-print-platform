import { Component, h, Host, Prop } from '@stencil/core';
import { templatePackageService } from 'src/global/template-package.service';

@Component({
  tag: 'print-footer-page',
  styleUrl: 'print-footer.page.scss',
})
export class PrintFooter {
  @Prop() tplName: string;
  @Prop() tplPackage?: string;

  async componentWillLoad() {
    await templatePackageService.defineCustomElements(this.tplPackage);
  }

  render() {
    return <Host innerHTML={`<leya-print-graph-paper></leya-print-graph-paper><tpl-${this.tplName}-footer></tpl-${this.tplName}-footer>`}></Host>
  }
}
