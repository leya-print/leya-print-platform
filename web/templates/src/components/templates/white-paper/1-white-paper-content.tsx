import { Component, h, Host } from '@stencil/core';
import { marked } from 'marked';
import DOMPurify from 'dompurify';


@Component({
  tag: 'tpl-white-paper-content',
  styleUrl: '1-white-paper-content.scss',
  shadow: false,
})
export class WhitePaperContentTpl {

  ComponentWillLoad = async () => {
    // document.getElementById('content').innerHTML = await marked.parse('# Marked in the browser\n\nRendered by **marked**.');
    document.getElementById('content').innerHTML = DOMPurify.sanitize(marked.parse('# Marked in the browser\n\nRendered by **marked**.'));
  }

  render() {
    return <Host>
      <div id="content"></div>
    </Host>
  }
}
