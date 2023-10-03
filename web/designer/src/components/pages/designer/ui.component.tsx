import { Component, Event, EventEmitter, h, Host, Prop, State } from '@stencil/core';
import { env } from 'src/global/env';

@Component({
  tag: 'designer-ui',
  styleUrl: 'ui.component.scss',
  shadow: false,
})
export class DesignerUiComponent {
  @Prop() tplName: string;
  @Prop() sampleData?: any;
  @State() raster: boolean;
  @State() watermark?: string;

  previewUrl: string;

  private _payload: HTMLTextAreaElement;
  private _lastUpdateTrigger = 0;
  private _lastUpdate = Date.now();

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
    this.raster = !!url.searchParams.get('raster');
    this.watermark = url.searchParams.get('watermark') || undefined;
    this.previewUrl = (await env).pdfServiceBaseUrl + '/pdf';
  }

  private readonly updateWatermark = (event: Event) => {
    const input = event.target as HTMLInputElement;
    const watermark = input.value;
    const url = new URL(location.href);
    if (watermark) {
      url.searchParams.set('watermark', watermark);
      this.watermark = watermark;
    } else {
      url.searchParams.delete('watermark');
      delete this.watermark;
    }
    history.replaceState(null, '', url.toString());

    console.log({ watermark: input.value });
  }
  
  private readonly toggleRaster = (event: Event) => {
    this.raster = !this.raster;
    const url = new URL(location.href);
    if (this.raster) {
      url.searchParams.set('raster', 'true');
    } else {
      url.searchParams.delete('raster');
    }
    history.replaceState(null, '', url.toString());

    console.log({ toggleRaster: event });
  }

  render() {
    return <Host>
      <form method="POST" action={`${this.previewUrl}/${this.tplName}/test.pdf${location.search}`} target='_blank'>
        <textarea name="payload" onKeyUp={this.enqueueUpdate} onChange={this.updatePreview} ref={(el) => this._payload = el}>{JSON.stringify(this.sampleData, null, 2)}</textarea>
        <div><input type="checkbox" onChange={this.toggleRaster} checked={this.raster} /> Raster</div>
        <div>watermark: <input onKeyUp={this.updateWatermark} value={this.watermark} /></div>
        <button class="button" type="submit">preview</button>
      </form>
    </Host>
  }
}
