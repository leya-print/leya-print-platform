import { i as invoiceSamples } from './invoice-samples-b94ba434.js';

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
