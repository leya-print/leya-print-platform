import { Component, h, Host } from '@stencil/core';

@Component({
  tag: 'tpl-template-demo-content',
  styleUrl: '1-template-demo-content.scss',
  shadow: false,
})
export class TemplateDemoContentTpl {
  render() {
    return <Host>
      content start
      <div class="template-demo__content__spacer" style={{ height: '1000px' }}>
        spacer
      </div>
      {new Array(20).fill(true).map((_, i) => {
        return <section>
          <h3>Section {i}</h3>
          <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.</p>
        </section>
      })}
      <div class="template-demo__content-end">content end</div>
    </Host>
  }
}
