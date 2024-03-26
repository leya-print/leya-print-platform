import {LitElement, html} from 'lit';
import {customElement} from 'lit/decorators.js';

@customElement('index-element')
export class IndexElement extends LitElement {
  override render() {
    return html`
      <div>Hello from IndexElement!</div>
    `;
  }
}

declare global {
    interface HTMLElementTagNameMap {
      'index-element': IndexElement;
    }
  }