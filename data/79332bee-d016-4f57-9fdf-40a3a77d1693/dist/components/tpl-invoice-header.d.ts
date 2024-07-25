import type { Components, JSX } from "../types/components";

interface TplInvoiceHeader extends Components.TplInvoiceHeader, HTMLElement {}
export const TplInvoiceHeader: {
  prototype: TplInvoiceHeader;
  new (): TplInvoiceHeader;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
