import { Component, Event, EventEmitter, h, Host, Prop } from '@stencil/core';
import { invoiceSamples } from 'src/components/templates/invoice/invoice-samples';

const previewPort = 6001;
const previewUrl = window.location.href.includes('gitpod.io')
    ? `${window.location.href.split('/').slice(0, 3).join('/').replace('6002', '' + previewPort)}/pdf`
    : `http://localhost:${previewPort}/pdf`
;

console.log('preview url: ', previewUrl);

@Component({
  tag: 'designer-ui',
  styleUrl: 'ui.component.scss',
  shadow: false,
})
export class DesignerUiComponent {
  @Prop() tplName: string;

  private _invoiceSample = (window as any).providedData || invoiceSamples['invoice-001'];
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


  render() {
    return <Host>
      <form method="POST" action={`${previewUrl}/${this.tplName}/test.pdf`} target='_blank'>

        <textarea name="payload" onKeyUp={this.enqueueUpdate} onChange={this.updatePreview} ref={(el) => this._payload = el}>{JSON.stringify(this._invoiceSample, null, 2)}</textarea>
        <button class="button" type="submit">preview</button>
      </form>
    </Host>
  }
}
