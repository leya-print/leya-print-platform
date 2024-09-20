export { setAssetPath, setNonce, setPlatformOptions } from '@stencil/core/internal/client';
import { i as invoiceSamples } from './invoice-samples.js';
export { MyComponent, defineCustomElement as defineCustomElementMyComponent } from './my-component.js';
export { TplInvoiceContent, defineCustomElement as defineCustomElementTplInvoiceContent } from './tpl-invoice-content.js';
export { TplInvoiceFooter, defineCustomElement as defineCustomElementTplInvoiceFooter } from './tpl-invoice-footer.js';
export { TplInvoiceHeader, defineCustomElement as defineCustomElementTplInvoiceHeader } from './tpl-invoice-header.js';
export { TplTemplateDemoContent, defineCustomElement as defineCustomElementTplTemplateDemoContent } from './tpl-template-demo-content.js';
export { TplTemplateDemoFooter, defineCustomElement as defineCustomElementTplTemplateDemoFooter } from './tpl-template-demo-footer.js';
export { TplTemplateDemoHeader, defineCustomElement as defineCustomElementTplTemplateDemoHeader } from './tpl-template-demo-header.js';
export { TplWorkReportContent, defineCustomElement as defineCustomElementTplWorkReportContent } from './tpl-work-report-content.js';
export { TplWorkReportFooter, defineCustomElement as defineCustomElementTplWorkReportFooter } from './tpl-work-report-footer.js';
export { TplWorkReportHeader, defineCustomElement as defineCustomElementTplWorkReportHeader } from './tpl-work-report-header.js';
export { TplbAddress, defineCustomElement as defineCustomElementTplbAddress } from './tplb-address.js';
export { TplbAddressLine, defineCustomElement as defineCustomElementTplbAddressLine } from './tplb-address-line.js';

const invoiceTemplateInfo = {
  ident: 'invoice',
  title: 'Invoice',
  description: 'invoices for customers',
  components: {
    header: 'tpl-invoice-header',
    content: 'tpl-invoice-content',
    footer: 'tpl-invoice-footer',
  },
  sampleData: {
    'invoice-001': {
      title: 'invoice 0001',
      description: 'simple sample of an invoice',
      data: invoiceSamples['invoice-001'],
    },
  },
};

// import { templateDemoTemplateInfo } from './components/templates/template-demo/template-demo-template-info.const';
// import { workReportTemplateInfo } from './components/templates/work-report/work-report-template-info.const';
const templatePackage = {
  ident: 'max-hardware-templates',
  version: '1.0.0',
  templates: [
    // templateDemoTemplateInfo,
    invoiceTemplateInfo,
    // workReportTemplateInfo,
  ],
};

export { templatePackage };
