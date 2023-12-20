import { TemplateInfo } from '@leya-print/template-api';

export const templateDemoTemplateInfo: TemplateInfo = {
  ident: 'template-demo',
  title: 'Template Demo',
  description: 'shows the different parts of a template',
  components: {
    header: 'tpl-template-demo-header',
    content: 'tpl-template-demo-content',
    footer: 'tpl-template-demo-footer',
  },
  sampleData: {
    'sample-contents': {
      title: 'Simple Sample Contents',
      description: 'simple sample contents',
      data: {},
    },
  },
};
