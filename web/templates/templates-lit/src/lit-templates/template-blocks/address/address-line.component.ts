import {LitElement, html} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {Address} from '../../../models/address.model';

@customElement('tplb-address-line')
export class AddressComponent extends LitElement {
  @property()
  address!: Address;

   /* Switch to Light DOM
  By default LIT renders components to shadow DOM which cannot be rendered by the Leya Printing Service.
  The component should render using Light DOM to work.
  */
  override createRenderRoot() {
    return this;
  }

  override render() {
    const a: Address = this.address;

    return html`<Host
      >${[
        this.line(a.firstName ?? '', a.lastName ?? ''),
        this.line(a.company ?? ''),
        this.line(a.street1 ?? ''),
        this.line(a.street2 ?? ''),
        this.line(a.zipCode ?? '', a.city ?? ''),
        this.line(a.country ?? ''),
      ]
        .filter((p) => !!p)
        .join(', ')}</Host
    > `;
  }

  line(...words: string[]) {
    return words.filter((w) => !!w).join(' ');
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'tplb-address-line': AddressComponent;
  }
}
