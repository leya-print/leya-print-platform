import type { Components, JSX } from "../types/components";

interface TplbAddressLine extends Components.TplbAddressLine, HTMLElement {}
export const TplbAddressLine: {
  prototype: TplbAddressLine;
  new (): TplbAddressLine;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
