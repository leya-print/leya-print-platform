import { Component, h, Host, VNode } from '@stencil/core';
import '@leya-print/web-common/dist/components/leya-print-graph-paper'
import '@leya-print/web-common/dist/components/leya-print-watermark'
const version = '1.0.2';

@Component({
  tag: 'app-root',
  styleUrl: 'app-root.scss',
  shadow: false,
})
export class AppRoot {
  readonly version = version;
  getPage(): {
    contents: VNode,
    title?: string
  } {
    const path = location.pathname;
    
    if (path.includes('/designer/')) {
      const pathParts = path.match(/\/designer\/(?<tplName>[^\/]+)/);
      const tplName = pathParts.groups?.['tplName'];
      const tplPackage = new URL(location.href).searchParams.get('tplPackage');
      return {
        contents: <designer-page tplName={tplName} tplPackage={tplPackage}></designer-page>,
        title: 'Designer',
      };
    }

    return {
      contents: <home-page></home-page>,
    };
  }

  render() {
    const { contents, title } = this.getPage();
    
    return <Host>
      <header class="app-root__header">
        <h1><a href="/dev/">leya print</a>{title ? <span>{title}</span> : ''}</h1>
        <span>version {this.version}</span>
      </header>
      <main class="app-root__main">{contents}</main>
    </Host>

    {/* <Host>{contents}</Host>  */}
  }
}
