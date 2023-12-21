import {LitElement, html} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import { Address } from '../../../models/address.model';

@customElement('tplb-address-line')
export class AddressComponent extends LitElement {

  @property()
  address!: Address;

  override render() {
    const a = this.address;

    return html`<Host innerHTML={
      [
        ${line(a.firstName ?? '', a.lastName ?? '')},
        ${line(a.company ?? '')},
        ${line(a.street1 ?? '')},
        ${line(a.street2 ?? '')},
        ${line(a.zipCode ?? '', a.city ?? '')},
        ${line(a.country ?? '')},
      ].filter((p) => !!p).join(', ')
    }></Host>
`  }
}

function line(...words: string[]) {  
  return words.filter((w) => !!w).join(' ');
}

declare global {
  interface HTMLElementTagNameMap {
    'tplb-address-line': AddressComponent;
  }
}
