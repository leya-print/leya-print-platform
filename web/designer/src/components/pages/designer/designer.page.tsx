import { Component, Fragment, h, Host, Listen, Prop, State } from '@stencil/core';

@Component({
  tag: 'designer-page',
  styleUrl: 'designer.page.scss',
  shadow: true,
})
export class AppHome {
  @Prop() tplName = 'invoice';
  @Prop() tplLoader = '123';

  @State() reloading = false;

  @Listen('designer-reload-preview')
  reloadPreview() {
    this.reloading = true;
    setTimeout(() => this.reloading = false, 10);
  }

  render() {
    return <Host>
      <script type="module">{`
        import('/templates/${this.tplLoader}/loader.js').then(
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
