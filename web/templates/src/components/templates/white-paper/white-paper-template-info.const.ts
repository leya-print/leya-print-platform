import { TemplateInfo } from '@leya-print/template-api';

export const whitePaperTemplateInfo: TemplateInfo = {
  ident: 'white-paper',
  title: 'White Paper',
  description: 'white paper for template packages of Leya Print Platform',
  components: {
    header: 'tpl-white-paper-header',
    content: 'tpl-white-paper-content',
    footer: 'tpl-white-paper-footer',
  },
  sampleData: {
    'simple': {
      title: 'White Paper for Leya Print Platform',
      description: 'Simple sample of a white paper',
      data: {},
    },
  },
};
