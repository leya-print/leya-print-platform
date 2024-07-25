import { proxyCustomElement, HTMLElement, h, Host } from '@stencil/core/internal/client';

const AddressComponent = /*@__PURE__*/ proxyCustomElement(class extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
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
}, [0, "tplb-address-line", {
    "address": [16]
  }]);
function line(...words) {
  return words.filter((w) => !!w).join(' ');
}
function defineCustomElement() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["tplb-address-line"];
  components.forEach(tagName => { switch (tagName) {
    case "tplb-address-line":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, AddressComponent);
      }
      break;
  } });
}

export { AddressComponent as A, defineCustomElement as d };
