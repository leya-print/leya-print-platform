import type { Address } from '../../../models/address.model';
import { Component, h, Host, Prop } from '@stencil/core';

@Component({
  tag: 'tplb-address',
})
export class AddressComponent {
  @Prop() address: Address;

  render() {
    const a = this.address;
    return <Host>{[
        line('name', a.firstName, a.lastName),
        line('company', a.company),
        line('street', a.street1),
        line('street', a.street2),
        line('city', a.zipCode, a.city),
        line('country', a.country),
      ]
      .filter((l) => !!l)
      .map((l) => <div>{l}</div>)}</Host>
  }
}

function line(part: string, ...words: string[]) {
  const content = words.filter((w) => !!w).join(' ');
  return content && <div class={`tplb-address-${part}`}>{content}</div>
}
