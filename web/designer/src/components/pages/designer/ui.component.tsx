import { Component, Event, EventEmitter, h, Host, Prop } from '@stencil/core';
import { env } from 'src/global/env';

@Component({
  tag: 'designer-ui',
  styleUrl: 'ui.component.scss',
  shadow: false,
})
export class DesignerUiComponent {
  @Prop() tplName: string;
  @Prop() sampleData?: any;

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
    this.previewUrl = (await env).pdfServiceBaseUrl + '/pdf';
  }

  render() {
    return <Host>
      <form method="POST" action={`${this.previewUrl}/${this.tplName}/test.pdf${location.search}`} target='_blank'>
        <textarea name="payload" onKeyUp={this.enqueueUpdate} onChange={this.updatePreview} ref={(el) => this._payload = el}>{JSON.stringify(this.sampleData, null, 2)}</textarea>
        <button class="button" type="submit">preview</button>
      </form>
    </Host>
  }
}
