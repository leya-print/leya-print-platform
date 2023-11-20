import { r as registerInstance, h, H as Host } from './index-63403316.js';

const AddressComponent$1 = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
  }
  render() {
    const a = this.address;
    return h(Host, null, [
      line$1('name', a.firstName, a.lastName),
      line$1('company', a.company),
      line$1('street', a.street1),
      line$1('street', a.street2),
      line$1('city', a.zipCode, a.city),
      line$1('country', a.country),
    ]
      .filter((l) => !!l)
      .map((l) => h("div", null, l)));
  }
};
function line$1(part, ...words) {
  const content = words.filter((w) => !!w).join(' ');
  return content && h("div", { class: `tplb-address-${part}` }, content);
}

const AddressComponent = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
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
};
function line(...words) {
  return words.filter((w) => !!w).join(' ');
}

export { AddressComponent$1 as tplb_address, AddressComponent as tplb_address_line };
