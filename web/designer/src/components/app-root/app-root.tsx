import { Component, h } from '@stencil/core';

@Component({
  tag: 'app-root',
  styleUrl: 'app-root.scss',
  shadow: false,
})
export class AppRoot {
  render() {
    return (
      <div>
        <header class="app-root__header">
          <h1><a href="/">leya print</a></h1>
        </header>

        <main class="app-root__main">{(() => {
          const path = location.pathname;
          if (path.includes('/designer/')) {
            const pathParts = path.match(/\/designer\/(?<tplName>[^\/]+)/);
            const tplName = pathParts.groups?.['tplName'];
            return <designer-page tplName={tplName}></designer-page>
          }

          return <home-page></home-page>;
        })()}</main>
      </div>
    );
  }
}
