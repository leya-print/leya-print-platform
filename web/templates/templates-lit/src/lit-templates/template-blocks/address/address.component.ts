import {LitElement, html} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import { Address } from '../../../models/address.model';

@customElement('tplb-address')
export class AddressComponent extends LitElement {

  @property()
  address!: Address;

  override render() {
    const a = this.address;
    console.log(this.address);
    

    return html`    
    <Host>${[      
      line('name', a.firstName ?? '', a.lastName ?? ''),
      line('company', a.company ?? ''),
      line('street', a.street1 ?? ''),
      line('street', a.street2 ?? ''),      
      line('city', a.zipCode ?? '', a.city ?? ''),
      line('country', a.country ?? ''),
    ]
    .filter((l) => !!l)
    .map((l) => html`<div>${l}</div>`)}
    </Host>
    `;
  }
}

function line(part: string | undefined, ...words: string[]) {
  const content = words.filter((w) => !!w).join(' ');
  return content && html`<div class=${`tplb-address-${part}`}>${content}</div>`;
}

declare global {
  interface HTMLElementTagNameMap {
    'tplb-address': AddressComponent;
  }
}
