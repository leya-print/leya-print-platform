import { Component, h } from '@stencil/core';

@Component({
  tag: 'tpl-white-paper-footer',
  styleUrl: '2-white-paper-footer.scss',
})
export class WhitePaperFooterTpl {
  render() {
    return (
      <div class="page_number">
        Page <span class="pageNumber"></span> of <span class="totalPages"></span>
      </div>
    )
  }
}
