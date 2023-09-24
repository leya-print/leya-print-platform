import { TemplateInfo } from '@leya-print/template-api';

export const workReportTemplateInfo: TemplateInfo = {
  ident: 'work-report',
  title: 'Work Report',
  description: 'work log of hours and tasks',
  components: {
    header: 'tpl-work-report-header',
    content: 'tpl-work-report-content',
    footer: 'tpl-work-report-footer',
  },
  sampleData: {
    'simple': {
      title: 'simple work report',
      description: 'simple sample of a work report',
      data: {},
    },
  },
};
