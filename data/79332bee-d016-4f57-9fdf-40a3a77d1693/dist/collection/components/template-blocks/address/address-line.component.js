import { h, Host } from '@stencil/core';
export class AddressComponent {
  constructor() {
    this.address = undefined;
  }
  render() {
    const a = this.address;
    return h(Host, { innerHTML: [
        line(a.firstName, a.lastName),
        line(a.company),
        line(a.street1),
        line(a.street2),
        line(a.zipCode, a.city),
        line(a.country),
      ].filter((p) => !!p).join(', ') });
  }
  static get is() { return "tplb-address-line"; }
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
function line(...words) {
  return words.filter((w) => !!w).join(' ');
}
