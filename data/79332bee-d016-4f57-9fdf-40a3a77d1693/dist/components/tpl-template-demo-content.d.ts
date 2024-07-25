import type { Components, JSX } from "../types/components";

interface TplTemplateDemoContent extends Components.TplTemplateDemoContent, HTMLElement {}
export const TplTemplateDemoContent: {
  prototype: TplTemplateDemoContent;
  new (): TplTemplateDemoContent;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
