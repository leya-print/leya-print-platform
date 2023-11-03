import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'leya-print-watermark',
  styleUrl: 'watermark.component.scss',
  shadow: false,
})
export class LeyaCommonWatermark {

  render() {
    const leyaPrintWatermark = new URL(window.location.href).searchParams.get('watermark') || '';
    return <Host>{leyaPrintWatermark}</Host>
  }
}
