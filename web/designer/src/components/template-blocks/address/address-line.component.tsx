import type { Address } from '@leya-print/common-api';
import { Component, h, Host, Prop } from '@stencil/core';

@Component({
  tag: 'tplb-address-line',
})
export class AddressComponent {
  @Prop() address: Address;

  render() {
    const a = this.address;
    return <Host innerHTML={
      [
        line(a.firstName, a.lastName),
        line(a.company),
        line(a.street1),
        line(a.street2),
        line(a.zipCode, a.city),
        line(a.country),
      ].filter((p) => !!p).join(', ')
    }></Host>
  }
}

function line(...words: string[]) {
  return words.filter((w) => !!w).join(' ');
}
