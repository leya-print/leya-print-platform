import { TemplateInfo } from '@leya-print/template-api';
import { WhitePaper } from './white-paper-model';
import sampleData from './white-paper.json';

export const whitePaperTemplateInfo: TemplateInfo<WhitePaper> = {
  ident: 'white-paper',
  title: 'White Paper',
  description: 'Whitepaper about the template packages feature of the Leya Print Platform',
  components: {
    header: 'tpl-white-paper-header',
    content: 'tpl-white-paper-content',
    footer: 'tpl-white-paper-footer',
  },
  sampleData: {
    'simple': {
      title: 'White Paper for Leya Print Platform',
      description: 'A simple white paper',
      data: sampleData,
    },
  },
};
