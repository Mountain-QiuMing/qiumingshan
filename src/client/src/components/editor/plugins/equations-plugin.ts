import type { LexicalCommand } from 'lexical';

import 'katex/dist/katex.css';

import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $getSelection, $isRangeSelection, COMMAND_PRIORITY_EDITOR, createCommand } from 'lexical';
import { useEffect } from 'react';

import { EquationComponentProps, $createEquationNode, EquationNode } from '../nodes/equation-node';

export const INSERT_EQUATION_COMMAND: LexicalCommand<{
  equation: string;
  inline: boolean;
}> = createCommand();

export default function EquationsPlugin(): JSX.Element | null {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    if (!editor.hasNodes([EquationNode])) {
      throw new Error('ExcalidrawPlugin: ExcalidrawNode not registered on editor');
    }

    return editor.registerCommand(
      INSERT_EQUATION_COMMAND,
      (payload: EquationComponentProps) => {
        const { equation, inline } = payload;
        const selection = $getSelection();

        if ($isRangeSelection(selection)) {
          const equationNode = $createEquationNode(equation, inline);

          selection.insertNodes([equationNode]);
        }

        return true;
      },
      COMMAND_PRIORITY_EDITOR,
    );
  }, [editor]);

  return null;
}
