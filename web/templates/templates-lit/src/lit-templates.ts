import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';

import './lit-templates/invoice/0-invoice-header'
import './lit-templates/invoice/1-invoice-content'
import './lit-templates/invoice/2-invoice-footer'

/**
 * Component to display templates.
 * Return all components to be rendered in index.html and to be packaged
 */
@customElement('lit-templates')
export class LitTemplates extends LitElement {
  override render() {
    return html`
    <h1> Templates view: </h1>
    <div>
      <tpl-invoice-header></tpl-invoice-header>
      <tpl-invoice-content></tpl-invoice-content>
      <tpl-invoice-footer></tpl-invoice-footer>
    </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'lit-templates': LitTemplates;
  }
}
