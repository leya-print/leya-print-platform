import { Component, h, Host, Prop } from '@stencil/core';

@Component({
  tag: 'designer-stage',
  styleUrl: 'stage.component.scss',
  shadow: true,
})
export class DesignerStageComponent {
  @Prop() pageWidth = '21cm';
  @Prop() pageHeight = '27cm';

  @Prop() headerHeight = '5cm';
  @Prop() footerHeight = '3cm';

  render() {
    return <Host style={{
      width: this.pageWidth,
      height: `calc(${this.pageHeight} - ${this.headerHeight} - ${this.footerHeight})`,
      paddingTop: this.headerHeight,
      paddingBottom: this.footerHeight,
    }}>
      <div
        class="designer-stage__header"
        style={{
          height: this.headerHeight,
          width: this.pageWidth,
          transform: `translateX(-1px) translateY(calc(-${this.headerHeight} - 1px))`,
        }}
      ><slot name="stage-header"></slot></div>
      <div
        class="designer-stage__footer"
        style={{
          height: this.footerHeight,
          width: this.pageWidth,
          transform: `translateX(-1px) translateY(calc(${this.pageHeight} - ${this.headerHeight} - ${this.footerHeight} - 1px))`,
        }}
      ><slot name="stage-footer"></slot></div>
      <div
        class="designer-stage__content"
      ><slot name="stage-content"></slot></div>
    </Host>;
  }
}
