import { MarkdownShortcutPlugin } from '@lexical/react/LexicalMarkdownShortcutPlugin';
import { FC } from 'react';

import { UlTRA_TRANSFORMERS } from './markdown-transformers';

const MarkdownPlugin: FC = () => {
  return <MarkdownShortcutPlugin transformers={UlTRA_TRANSFORMERS} />;
};

export default MarkdownPlugin;
