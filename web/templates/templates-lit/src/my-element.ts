// import {LitElement, html, css} from 'lit';
import {LitElement, html} from 'lit';
import {customElement} from 'lit/decorators.js';

import './lit-templates/invoice/0-invoice-header'
import './lit-templates/invoice/1-invoice-content'
import './lit-templates/invoice/2-invoice-footer'

/**
 * Component to display testing templates.
 * 
 */
@customElement('my-element')
export class MyElement extends LitElement {
  // static override styles = css`
  //   :host {
  //     display: block;
  //     border: solid 1px gray;
  //     margin: 2px
  //     padding: 16px;
  //     max-width: 800px;
  //   }
  // `;

  override render() {    
    return html`
    <h1> Templates view: </h1>
    <div>
      <tpl-invoice-header></tpl-invoice-header>
      <tpl-invoice-content></tpl-invoice-content>
      <tpl-invoice-footer></tpl-invoice-footer>
    </div>            
      <slot></slot>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'my-element': MyElement;
  }
}
