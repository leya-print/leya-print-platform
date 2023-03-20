import { i as invoiceSamples } from './invoice-samples-ab010f4d.js';

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

const templatePackage = {
  ident: 'max-hardware-templates',
  version: '1.0.0',
  templates: [
    invoiceTemplateInfo,
  ],
};

export { templatePackage };
