import { Component, h, Host, Prop } from '@stencil/core';
import { templatePackageService } from 'src/global/template-package.service';

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
      innerHTML={`<graph-paper></graph-paper><tpl-${this.tplName}-header></tpl-${this.tplName}-header>`}
    ></Host>
  }
}
