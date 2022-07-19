import { Component, Fragment, h, Host, Listen, Prop, State } from '@stencil/core';

@Component({
  tag: 'designer-page',
  styleUrl: 'designer.page.scss',
  shadow: true,
})
export class AppHome {
  @Prop() tplName = 'invoice';
  @Prop() tplPackage?: string;

  @State() reloading = false;

  @Listen('designer-reload-preview')
  reloadPreview() {
    this.reloading = true;
    setTimeout(() => this.reloading = false, 10);
  }

  async componentWillLoad() {
    const tplBaseUrl = this.tplPackage ? `http://localhost:7001/tpl-contents/${this.tplPackage}` : `http://localhost:3333/build`;
    const templateInfo = eval(`import {templateInfo} from '${tplBaseUrl + '/index.js'}'`);
    console.log({ templateInfo });
  }

  render() {
    const tplSrc = this.tplPackage ? `http://localhost:7001/tpl-contents/${this.tplPackage}/loader.js` : `http://localhost:3333/build/templates.esm.js`
    console.log('templates', {
      tplPackage: this.tplPackage,
      tplSrc,
    });
    return <Host>
      <script type="module">{`
        import('${tplSrc}').then(
          (loader) => loader.defineCustomElements()
        );
      `}
      </script>
      <designer-ui
        tplName={this.tplName}
      ></designer-ui>
      <designer-stage>{ !this.reloading && <Fragment>
        <div slot="stage-header" innerHTML={`<tpl-${this.tplName}-header></tpl-${this.tplName}-header>`}></div>
        <div slot="stage-content" innerHTML={`<tpl-${this.tplName}-content></tpl-${this.tplName}-content>`}></div>
        <div slot="stage-footer" innerHTML={`<tpl-${this.tplName}-footer></tpl-${this.tplName}-footer>`}></div>
      </Fragment>}</designer-stage>
    </Host>;
  }
}
