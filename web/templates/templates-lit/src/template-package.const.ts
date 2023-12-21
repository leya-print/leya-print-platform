import { TemplatePackage } from '@leya-print/template-api';
import { invoiceTemplateInfo } from './lit-templates/invoice/invoice-template-info.const';

export const templatePackage: TemplatePackage = {
  ident: 'lit-templates',
  version: '1.0.0',
  templates: [  
    invoiceTemplateInfo,    
  ],
};
