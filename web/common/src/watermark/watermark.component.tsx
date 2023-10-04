import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'leya-print-watermark',
  styleUrl: 'leya-print-watermark.component.scss',
  shadow: false,
})
export class LeyaPrintWatermark {

  render() {
    const leyaPrintWatermark = new URL(window.location.href).searchParams.get('leya-print-watermark');
    return <Host>{leyaPrintWatermark && <div class="leya-print-watermark">{leyaPrintWatermark}</div>}</Host>
  }
}
