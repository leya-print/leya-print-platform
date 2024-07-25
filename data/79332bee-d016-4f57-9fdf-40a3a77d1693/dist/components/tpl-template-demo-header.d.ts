import type { Components, JSX } from "../types/components";

interface TplTemplateDemoHeader extends Components.TplTemplateDemoHeader, HTMLElement {}
export const TplTemplateDemoHeader: {
  prototype: TplTemplateDemoHeader;
  new (): TplTemplateDemoHeader;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
