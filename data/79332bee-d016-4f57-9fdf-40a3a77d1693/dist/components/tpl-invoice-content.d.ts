import type { Components, JSX } from "../types/components";

interface TplInvoiceContent extends Components.TplInvoiceContent, HTMLElement {}
export const TplInvoiceContent: {
  prototype: TplInvoiceContent;
  new (): TplInvoiceContent;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
