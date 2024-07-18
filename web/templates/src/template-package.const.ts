import { TemplatePackage } from '@leya-print/template-api';
import { invoiceTemplateInfo } from './components/templates/invoice/invoice-template-info.const';
import { templateDemoTemplateInfo } from './components/templates/template-demo/template-demo-template-info.const';
import { workReportTemplateInfo } from './components/templates/work-report/work-report-template-info.const';

export const templatePackage: TemplatePackage = {
  ident: 'max-hardware-templates',
  version: '1.0.0',
  templates: [
    templateDemoTemplateInfo,
    invoiceTemplateInfo,
    workReportTemplateInfo,
  ],
};
