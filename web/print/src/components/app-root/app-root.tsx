import { Component, h, Host, VNode } from '@stencil/core';

@Component({
  tag: 'app-root',
  styleUrl: 'app-root.scss',
  shadow: false,
})
export class AppRoot {
  getPage(): {
    contents: VNode,
    title?: string,
    isPrintingPage?: true,
  } {
    const path = location.pathname; 

    if (path.includes('/print/')) {
      const pathParts = path.match(/\/print\/(?<tplName>[^\/]+)\/(?<pagePart>[^\/]+)/);
      const { tplName, pagePart } = pathParts.groups;
      const tplPackage = new URL(location.href).searchParams.get('tplPackage');
      switch (pagePart) {
        case 'header': return {
          contents: <print-header-page tplName={tplName} tplPackage={tplPackage}></print-header-page>,
          isPrintingPage: true,
        };
        case 'content': return {
          contents: <print-content-page tplName={tplName} tplPackage={tplPackage}></print-content-page>,
          isPrintingPage: true,
        };
        case 'footer': return {
          contents: <print-footer-page tplName={tplName} tplPackage={tplPackage}></print-footer-page>,
          isPrintingPage: true,
        };
        default:
          throw new Error('unknown page part: ' + pagePart);
      }
    }

    return {
      contents: <home-page></home-page>,
    };
  }

  render() {
    const { contents, title, isPrintingPage } = this.getPage();
    
    return isPrintingPage ? <Host>{contents}</Host> : <Host>
      <header class="app-root__header">
        <h1><a href="/dev/">leya print</a>{title ? <span>{title}</span> : ''}</h1>
      </header>
      <main class="app-root__main">{contents}</main>
    </Host>
  }
}
