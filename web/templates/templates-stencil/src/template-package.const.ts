// import { TemplatePackage } from '@leya-print/template-api';
import { TemplatePackage } from '../../../../common/template-api/types';
import { invoiceTemplateInfo } from './components/templates/invoice/invoice-template-info.const';
import { templateDemoTemplateInfo } from './components/templates/template-demo/template-demo-template-info.const';
import { workReportTemplateInfo } from './components/templates/work-report/work-report-template-info.const';

export const templatePackage: TemplatePackage = {
  ident: 'max-hardware-templates',
  templatesFilePath: 'templates.esm.js',
  version: '1.0.1',
  templates: [
    templateDemoTemplateInfo,
    invoiceTemplateInfo,
    workReportTemplateInfo,
  ],
};
