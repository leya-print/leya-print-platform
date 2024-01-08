import { Component, Fragment, h, Host, Listen, Prop, State, VNode } from '@stencil/core';
import { templatePackageService } from 'src/components/lib/template/template-package.service';

@Component({
  tag: 'designer-page',
  styleUrl: 'designer.page.scss',
  shadow: true,
})
export class DesignerPage {
  @Prop() tplName = 'invoice';
  @Prop() tplPackage?: string;

  @State() reloading = false;
  @State() reloadingStage = false;

  sampleData?: any;

  private loader?: VNode;

  @Listen('designer-reload-preview')  
  reloadPreview() {        
    this.reloading = true;
    setTimeout(() => this.reloading = false, 10);
  }

  @Listen('designer-reload')
  reloadStage() {        
    this.reloadingStage = true;
    setTimeout(() => this.reloadingStage = false, 0);
  }

  async componentWillLoad() {
    const templateInfo = await templatePackageService.templateInfo(this.tplPackage, this.tplName);

    this.sampleData = Object.values(templateInfo.sampleData)[0].data;
    await templatePackageService.defineCustomElements(this.tplPackage);
  }

  render() {
    return <Host>
      {this.loader}
      <designer-ui
        tplName={this.tplName}
        sampleData={this.sampleData}
      ></designer-ui>
      <designer-stage reloading={this.reloadingStage}>{ !this.reloading && <Fragment>
        <div slot="stage-header" innerHTML={`<tpl-${this.tplName}-header></tpl-${this.tplName}-header>`}></div>
        <div slot="stage-content" innerHTML={`<tpl-${this.tplName}-content></tpl-${this.tplName}-content>`}></div>
        <div slot="stage-footer" innerHTML={`<tpl-${this.tplName}-footer></tpl-${this.tplName}-footer>`}></div>
      </Fragment>}</designer-stage>
    </Host>;
  }
}
