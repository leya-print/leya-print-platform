// import { TemplatePackage } from '@leya-print/template-api';
import { TemplatePackage } from '/workspace/leya-print/common/template-api/types';
import { invoiceTemplateInfo } from './lit-templates/invoice/invoice-template-info.const';

export const templatePackage: TemplatePackage = {
  ident: 'lit-templates',
  templatesFilePath: 'lit-templates.esm.js',
  version: '1.0.0',
  templates: [
    invoiceTemplateInfo,
  ],
};