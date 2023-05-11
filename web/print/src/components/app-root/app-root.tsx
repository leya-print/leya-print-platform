import { Component, h, Host, VNode } from '@stencil/core';

@Component({
  tag: 'app-root',
  styleUrl: 'app-root.scss',
  shadow: false,
})
export class AppRoot {
  getPage(): {
    contents: VNode,
  } {
    const path = location.pathname; 

    const pathParts = path.match(/\/print\/(?<tplName>[^\/]+)\/(?<pagePart>[^\/]+)/);
    const { tplName, pagePart } = pathParts.groups;
    const tplPackage = new URL(location.href).searchParams.get('tplPackage');

    switch (pagePart) {
      case 'header': return {
        contents: <print-header-page tplName={tplName} tplPackage={tplPackage}></print-header-page>
      };
      case 'content': return {
        contents: <print-content-page tplName={tplName} tplPackage={tplPackage}></print-content-page>
      };
      case 'footer': return {
        contents: <print-footer-page tplName={tplName} tplPackage={tplPackage}></print-footer-page>
      };
      default:
        throw new Error('unknown page part: ' + pagePart);
    }
  }

  render() {
    const { contents } = this.getPage();
    
    return <Host>{contents}</Host>
  }
}
