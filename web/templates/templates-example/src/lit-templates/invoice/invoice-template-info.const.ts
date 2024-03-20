import { TemplateInfo } from '@leya-print/template-api';
import { invoiceSamples } from './invoice-samples';

export const invoiceTemplateInfo: TemplateInfo = {
  ident: 'invoice',
  title: 'Invoice',
  description: 'template - invoice for customers using lit elements',
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
