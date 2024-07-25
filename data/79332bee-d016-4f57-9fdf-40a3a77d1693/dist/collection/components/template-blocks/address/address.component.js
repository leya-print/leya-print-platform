import { h, Host } from '@stencil/core';
export class AddressComponent {
  constructor() {
    this.address = undefined;
  }
  render() {
    const a = this.address;
    return h(Host, null, [
      line('name', a.firstName, a.lastName),
      line('company', a.company),
      line('street', a.street1),
      line('street', a.street2),
      line('city', a.zipCode, a.city),
      line('country', a.country),
    ]
      .filter((l) => !!l)
      .map((l) => h("div", null, l)));
  }
  static get is() { return "tplb-address"; }
  static get properties() {
    return {
      "address": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "Address",
          "resolved": "Address",
          "references": {
            "Address": {
              "location": "import",
              "path": "../../../models/address.model"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        }
      }
    };
  }
}
function line(part, ...words) {
  const content = words.filter((w) => !!w).join(' ');
  return content && h("div", { class: `tplb-address-${part}` }, content);
}
