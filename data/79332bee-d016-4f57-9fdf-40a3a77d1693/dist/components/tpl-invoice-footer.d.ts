import type { Components, JSX } from "../types/components";

interface TplInvoiceFooter extends Components.TplInvoiceFooter, HTMLElement {}
export const TplInvoiceFooter: {
  prototype: TplInvoiceFooter;
  new (): TplInvoiceFooter;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
