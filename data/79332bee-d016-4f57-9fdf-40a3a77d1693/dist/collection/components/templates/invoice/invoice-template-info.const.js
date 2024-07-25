import { invoiceSamples } from './invoice-samples';
export const invoiceTemplateInfo = {
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
