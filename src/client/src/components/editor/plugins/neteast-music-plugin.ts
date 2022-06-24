import type { LexicalCommand } from 'lexical';

import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import {
  $createParagraphNode,
  $getSelection,
  $isRangeSelection,
  COMMAND_PRIORITY_EDITOR,
  createCommand,
} from 'lexical';
import { useEffect } from 'react';

import { $createNeteastMusicNode, NeteastMusicNode } from '../nodes/neteast-music-node';

export const INSERT_NETEAST_MUSIC_COMMAND: LexicalCommand<string> = createCommand();

export default function NeteastMusicPlugin(): JSX.Element {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    if (!editor.hasNodes([NeteastMusicNode])) {
      throw new Error('NeteastMusicPlugin: NeteastMusicNode not registered on editor');
    }

    return editor.registerCommand<string>(
      INSERT_NETEAST_MUSIC_COMMAND,
      payload => {
        const selection = $getSelection();

        if ($isRangeSelection(selection)) {
          const focusNode = selection.focus.getNode();

          if (focusNode !== null) {
            const neteastMusicNode = $createNeteastMusicNode(payload);

            selection.focus.getNode().getTopLevelElementOrThrow().insertAfter(neteastMusicNode);
            const paragraphNode = $createParagraphNode();

            neteastMusicNode.insertAfter(paragraphNode);
            paragraphNode.select();
          }
        }

        return true;
      },
      COMMAND_PRIORITY_EDITOR,
    );
  }, [editor]);

  return null;
}
