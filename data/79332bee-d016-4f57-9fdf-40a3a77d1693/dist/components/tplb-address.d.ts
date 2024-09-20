import type { Components, JSX } from "../types/components";

interface TplbAddress extends Components.TplbAddress, HTMLElement {}
export const TplbAddress: {
  prototype: TplbAddress;
  new (): TplbAddress;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
