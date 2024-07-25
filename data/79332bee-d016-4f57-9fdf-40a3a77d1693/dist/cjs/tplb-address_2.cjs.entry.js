'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-90772d73.js');

const AddressComponent$1 = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.address = undefined;
  }
  render() {
    const a = this.address;
    return index.h(index.Host, null, [
      line$1('name', a.firstName, a.lastName),
      line$1('company', a.company),
      line$1('street', a.street1),
      line$1('street', a.street2),
      line$1('city', a.zipCode, a.city),
      line$1('country', a.country),
    ]
      .filter((l) => !!l)
      .map((l) => index.h("div", null, l)));
  }
};
function line$1(part, ...words) {
  const content = words.filter((w) => !!w).join(' ');
  return content && index.h("div", { class: `tplb-address-${part}` }, content);
}

const AddressComponent = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.address = undefined;
  }
  render() {
    const a = this.address;
    return index.h(index.Host, { innerHTML: [
        line(a.firstName, a.lastName),
        line(a.company),
        line(a.street1),
        line(a.street2),
        line(a.zipCode, a.city),
        line(a.country),
      ].filter((p) => !!p).join(', ') });
  }
};
function line(...words) {
  return words.filter((w) => !!w).join(' ');
}

exports.tplb_address = AddressComponent$1;
exports.tplb_address_line = AddressComponent;
