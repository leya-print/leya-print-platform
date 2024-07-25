import { proxyCustomElement, HTMLElement, h, Host } from '@stencil/core/internal/client';

const AddressComponent = /*@__PURE__*/ proxyCustomElement(class extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
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
}, [0, "tplb-address", {
    "address": [16]
  }]);
function line(part, ...words) {
  const content = words.filter((w) => !!w).join(' ');
  return content && h("div", { class: `tplb-address-${part}` }, content);
}
function defineCustomElement() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["tplb-address"];
  components.forEach(tagName => { switch (tagName) {
    case "tplb-address":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, AddressComponent);
      }
      break;
  } });
}

export { AddressComponent as A, defineCustomElement as d };
