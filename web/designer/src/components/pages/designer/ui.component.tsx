import { Component, Event, EventEmitter, h, Host, Prop, State } from '@stencil/core';
import { env } from 'src/global/env';
import { rasterService } from '@leya-print/web-common';

@Component({
  tag: 'designer-ui',
  styleUrl: 'ui.component.scss',
  shadow: false,
})
export class DesignerUiComponent {
  @Prop() tplName: string;
  @Prop() sampleData?: any;
  @State() rasterIsActive = false;
  //@State() raster: boolean;
  @State() leyaPrintWatermark?: string;

  previewUrl: string;

  private _payload: HTMLTextAreaElement;
  private _lastUpdateTrigger = 0;
  private _lastUpdate = Date.now();

  connectedCallback() {
    rasterService.registerListener(this._syncRaster);
  }

  private _syncRaster = (isActive) => this.rasterIsActive = isActive;

  disconnectedCallback() {
    rasterService.unregisterListener(this._syncRaster);
  }

  @Event({ eventName: 'designer-reload-preview' }) reloadPreview: EventEmitter<void>;
  updatePreview = () => {
    this._lastUpdate = Date.now();
    (window as any).providedData = JSON.parse(this._payload.value);
    this.reloadPreview.emit();
  }

  enqueueUpdate = () => {
    const triggerDelay = 500;

    setTimeout(() => {
      const now = Date.now();
      const timeSinceLastUpdate = now - this._lastUpdate;
      const alreadyUpdated =  timeSinceLastUpdate < triggerDelay;
      if (alreadyUpdated) { return; }

      const nextTriggerRunning = now - this._lastUpdateTrigger < triggerDelay;
      if (!nextTriggerRunning || (timeSinceLastUpdate > 2 * triggerDelay)) {
        this.updatePreview();
      }
    }, triggerDelay);
  }

  async componentWillLoad() {
    const url = new URL(window.location.href);
   // this.raster = !!url.searchParams.get('raster');
    this.leyaPrintWatermark = url.searchParams.get('watermark') || undefined;
    this.previewUrl = (await env).pdfServiceBaseUrl + '/pdf';
  }

  private readonly updateLeyaPrintWatermark = (event: Event) => {
    const input = event.target as HTMLInputElement;
    const leyaPrintWatermark = input.value;
    const url = new URL(location.href);
    if (leyaPrintWatermark) {
      url.searchParams.set('watermark', leyaPrintWatermark);
      this.leyaPrintWatermark = leyaPrintWatermark;
    } else {
      url.searchParams.delete('watermark');
      delete this.leyaPrintWatermark;
    }
    history.replaceState(null, '', url.toString());

    console.log({ leyaPrintWatermark: input.value });
  }

  render() {
    return <Host>
      <form method="POST" action={`${this.previewUrl}/${this.tplName}/test.pdf${location.search}`} target='_blank'>
        <textarea name="payload" onKeyUp={this.enqueueUpdate} onChange={this.updatePreview} ref={(el) => this._payload = el}>{JSON.stringify(this.sampleData, null, 2)}</textarea>
        <div onClick={() => rasterService.toggle()}>
          <input name="raster" type="checkbox" checked={this.rasterIsActive} /><label>raster</label>
        </div>
        {/* <div><input type="checkbox" onChange={this.toggleRaster} checked={this.raster} /> Raster</div> */}
        <div>leyaPrintWatermark: <input onKeyUp={this.updateLeyaPrintWatermark} value={this.leyaPrintWatermark} /></div>
        <button class="button" type="submit">preview</button>
      </form>
    </Host>
  }
}
