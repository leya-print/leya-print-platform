import { Component, h, Host, State } from '@stencil/core';
import { WhitePaper } from './white-paper-model';
import { marked } from 'marked/lib/marked.esm';

@Component({
  tag: 'tpl-white-paper-content',
  styleUrl: '1-white-paper-content.scss',
  shadow: false,
  assetsDirs: ['assets'],
})
export class WhitePaperContentTpl {
  @State() data: WhitePaper = (window as any).providedData || {
    title: 'no data',
    contents: 'test',
  };
  @State() htmlContent: string = '';

  async componentWillLoad() {
    this.htmlContent = await marked(this.data.contents, { async: false });
  }

  render() {
    return <Host>
      <div innerHTML={this.htmlContent}></div>
    </Host>
  }
}
