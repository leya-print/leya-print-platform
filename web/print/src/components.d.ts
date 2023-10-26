/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
export namespace Components {
    interface AppRoot {
    }
    interface LeyaPrintWatermark {
    }
    interface PrintContentPage {
        "tplName": string;
        "tplPackage"?: string;
    }
    interface PrintFooterPage {
        "tplName": string;
        "tplPackage"?: string;
    }
    interface PrintHeaderPage {
        "tplName": string;
        "tplPackage"?: string;
    }
}
declare global {
    interface HTMLAppRootElement extends Components.AppRoot, HTMLStencilElement {
    }
    var HTMLAppRootElement: {
        prototype: HTMLAppRootElement;
        new (): HTMLAppRootElement;
    };
    interface HTMLLeyaPrintWatermarkElement extends Components.LeyaPrintWatermark, HTMLStencilElement {
    }
    var HTMLLeyaPrintWatermarkElement: {
        prototype: HTMLLeyaPrintWatermarkElement;
        new (): HTMLLeyaPrintWatermarkElement;
    };
    interface HTMLPrintContentPageElement extends Components.PrintContentPage, HTMLStencilElement {
    }
    var HTMLPrintContentPageElement: {
        prototype: HTMLPrintContentPageElement;
        new (): HTMLPrintContentPageElement;
    };
    interface HTMLPrintFooterPageElement extends Components.PrintFooterPage, HTMLStencilElement {
    }
    var HTMLPrintFooterPageElement: {
        prototype: HTMLPrintFooterPageElement;
        new (): HTMLPrintFooterPageElement;
    };
    interface HTMLPrintHeaderPageElement extends Components.PrintHeaderPage, HTMLStencilElement {
    }
    var HTMLPrintHeaderPageElement: {
        prototype: HTMLPrintHeaderPageElement;
        new (): HTMLPrintHeaderPageElement;
    };
    interface HTMLElementTagNameMap {
        "app-root": HTMLAppRootElement;
        "leya-print-watermark": HTMLLeyaPrintWatermarkElement;
        "print-content-page": HTMLPrintContentPageElement;
        "print-footer-page": HTMLPrintFooterPageElement;
        "print-header-page": HTMLPrintHeaderPageElement;
    }
}
declare namespace LocalJSX {
    interface AppRoot {
    }
    interface LeyaPrintWatermark {
    }
    interface PrintContentPage {
        "tplName"?: string;
        "tplPackage"?: string;
    }
    interface PrintFooterPage {
        "tplName"?: string;
        "tplPackage"?: string;
    }
    interface PrintHeaderPage {
        "tplName"?: string;
        "tplPackage"?: string;
    }
    interface IntrinsicElements {
        "app-root": AppRoot;
        "leya-print-watermark": LeyaPrintWatermark;
        "print-content-page": PrintContentPage;
        "print-footer-page": PrintFooterPage;
        "print-header-page": PrintHeaderPage;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "app-root": LocalJSX.AppRoot & JSXBase.HTMLAttributes<HTMLAppRootElement>;
            "leya-print-watermark": LocalJSX.LeyaPrintWatermark & JSXBase.HTMLAttributes<HTMLLeyaPrintWatermarkElement>;
            "print-content-page": LocalJSX.PrintContentPage & JSXBase.HTMLAttributes<HTMLPrintContentPageElement>;
            "print-footer-page": LocalJSX.PrintFooterPage & JSXBase.HTMLAttributes<HTMLPrintFooterPageElement>;
            "print-header-page": LocalJSX.PrintHeaderPage & JSXBase.HTMLAttributes<HTMLPrintHeaderPageElement>;
        }
    }
}
