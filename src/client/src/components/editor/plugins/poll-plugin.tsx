import type { LexicalCommand } from 'lexical';

import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $getSelection, $isRangeSelection, $isRootNode, COMMAND_PRIORITY_EDITOR, createCommand } from 'lexical';
import { useEffect } from 'react';

import { $createPollNode, PollNode } from '../nodes/poll-node';

export const INSERT_POLL_COMMAND: LexicalCommand<string> = createCommand();

export default function PollPlugin() {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    if (!editor.hasNodes([PollNode])) {
      throw new Error('PollPlugin: PollNode not registered on editor');
    }

    return editor.registerCommand(
      INSERT_POLL_COMMAND,
      (payload: string) => {
        const selection = $getSelection();

        if ($isRangeSelection(selection)) {
          const pollNode = $createPollNode(payload);

          if ($isRootNode(selection.anchor.getNode())) {
            selection.insertParagraph();
          }

          selection.insertNodes([pollNode]);
        }

        return true;
      },
      COMMAND_PRIORITY_EDITOR,
    );
  }, [editor]);

  return null;
}
