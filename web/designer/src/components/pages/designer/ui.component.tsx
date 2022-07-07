import { Component, Host, h, Prop } from '@stencil/core';

@Component({
  tag: 'designer-ui',
  styleUrl: 'ui.component.scss',
  shadow: false,
})
export class DesignerUiComponent {
  @Prop() tplName: string;

  render() {
    return <Host>
      <a class="button" href={`http://localhost:6001/pdf/${this.tplName}/test.pdf`} target='_blank'>preview</a>
    </Host>
  }
}
