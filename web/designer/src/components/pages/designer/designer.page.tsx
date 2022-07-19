import { Component, Fragment, h, Host, Listen, Prop, State } from '@stencil/core';
import { TemplatePackage } from '@leya-print/common-api';

@Component({
  tag: 'designer-page',
  styleUrl: 'designer.page.scss',
  shadow: true,
})
export class AppHome {
  @Prop() tplName = 'invoice';
  @Prop() tplPackage?: string;

  @State() reloading = false;

  sampleData?: any;

  private _tplSrc: string;

  @Listen('designer-reload-preview')
  reloadPreview() {
    this.reloading = true;
    setTimeout(() => this.reloading = false, 10);
  }

  async componentWillLoad() {
    try {
      const tplBaseUrl = this.tplPackage ? `http://localhost:7001/tpl-contents/${this.tplPackage}` : `http://localhost:3333/build`;
      const tplFileSuffix = this.tplPackage ? '.js' : '.esm.js';
      this._tplSrc = this.tplPackage ? `${tplBaseUrl}/loader.js` : `${tplBaseUrl}/templates.esm.js`;
      const templatePackage: TemplatePackage = (await import(`${tplBaseUrl}/index${tplFileSuffix}`)).templatePackage;
      const templateInfo = templatePackage.templates.find((tplInfo) => tplInfo.ident === this.tplName);
      this.sampleData = Object.values(templateInfo.sampleData)[0].data;
      console.log({ templateInfo });
    } catch (e) {
      console.warn('could not load sample data', e);
    }
  }

  render() {
    return <Host>
      <script type="module">{`
        import('${this._tplSrc}').then(
          (loader) => loader.defineCustomElements?.()
        );
      `}
      </script>
      <designer-ui
        tplName={this.tplName}
        sampleData={this.sampleData}
      ></designer-ui>
      <designer-stage>{ !this.reloading && <Fragment>
        <div slot="stage-header" innerHTML={`<tpl-${this.tplName}-header></tpl-${this.tplName}-header>`}></div>
        <div slot="stage-content" innerHTML={`<tpl-${this.tplName}-content></tpl-${this.tplName}-content>`}></div>
        <div slot="stage-footer" innerHTML={`<tpl-${this.tplName}-footer></tpl-${this.tplName}-footer>`}></div>
      </Fragment>}</designer-stage>
    </Host>;
  }
}
