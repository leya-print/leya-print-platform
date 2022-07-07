import { Component, Element, h, Host, Prop, State } from '@stencil/core';

@Component({
  tag: 'designer-stage',
  styleUrl: 'stage.component.scss',
  shadow: true,
})
export class DesignerStageComponent {
  @Prop() pageWidth = '21cm';
  @Prop() pageHeight = '29.7cm';

  @State() headerHeight = '5cm';
  @State() footerHeight = '3cm';

  @Element() el: HTMLElement;

  private heightCheckInterval?: any;

  componentDidRender() {
    setTimeout(() => {
      this._checkHeights();
      if (!this.heightCheckInterval) {
        this.heightCheckInterval = setInterval(() => this._checkHeights(), 100);
      }
    });
  }

  disconnectedCallback() {
    const intervalToClear = this.heightCheckInterval;
    if (intervalToClear) {
      delete this.heightCheckInterval;
      clearInterval(intervalToClear);
    }
  }

  private _checkHeights() {
    const heigthOf = (element?: Element) => {
      if (!element) { return '0'; }
      const height = element.getBoundingClientRect().height;
      return height ? height + 'px' : '0';
    }

    const stageHeader = this.el.querySelector('[slot=stage-header]');
    const measuredHeaderHeight = heigthOf(stageHeader);
    if (measuredHeaderHeight !== this.headerHeight) {
      console.log('update header height', { old: this.headerHeight, new: measuredHeaderHeight });
      this.headerHeight = measuredHeaderHeight;
    }

    const stageFooter = this.el.querySelector('[slot=stage-footer]');
    const measuredFooterHeight = heigthOf(stageFooter);
    if (measuredFooterHeight !== this.footerHeight) {
      console.log('update footer height', { old: this.footerHeight, new: measuredFooterHeight });
      this.footerHeight = measuredFooterHeight;
    }
  }

  render() {
    const contentHeight = `calc(${this.pageHeight} - ${this.headerHeight} - ${this.footerHeight})`;
    return <Host style={{
      width: this.pageWidth,
      height: contentHeight,
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
      ><graph-paper></graph-paper><slot name="stage-header"></slot></div>
      <div
        class="designer-stage__footer"
        style={{
          height: this.footerHeight,
          width: this.pageWidth,
          transform: `translateX(-1px) translateY(calc(${this.pageHeight} - ${this.headerHeight} - ${this.footerHeight} - 1px))`,
        }}
      ><graph-paper></graph-paper><slot name="stage-footer"></slot></div>
      <div
        class="designer-stage__content"
      >
        <style>{`
          .designer-stage__content .raster {
            height: ${contentHeight} !important;
          }
        `}</style>
        <graph-paper></graph-paper><slot name="stage-content"></slot></div>
    </Host>;
  }
}
