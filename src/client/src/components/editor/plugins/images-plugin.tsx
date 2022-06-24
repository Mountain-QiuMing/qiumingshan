import type { LexicalCommand } from 'lexical';

import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $getSelection, $isRangeSelection, $isRootNode, COMMAND_PRIORITY_EDITOR, createCommand } from 'lexical';
import { useEffect } from 'react';

import { $createImageNode, ImageNode } from '../nodes/image-node';

export type InsertImagePayload = Readonly<{
  altText: string;
  src: string;
}>;

export const INSERT_IMAGE_COMMAND: LexicalCommand<InsertImagePayload> = createCommand();
export default function ImagesPlugin(): JSX.Element {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    if (!editor.hasNodes([ImageNode])) {
      throw new Error('ImagesPlugin: ImageNode not registered on editor');
    }

    return editor.registerCommand(
      INSERT_IMAGE_COMMAND,
      (payload: InsertImagePayload) => {
        const selection = $getSelection();

        if ($isRangeSelection(selection)) {
          if ($isRootNode(selection.anchor.getNode())) {
            selection.insertParagraph();
          }

          const imageNode = $createImageNode(payload.src, payload.altText, 500);

          selection.insertNodes([imageNode]);
        }

        return true;
      },
      COMMAND_PRIORITY_EDITOR,
    );
  }, [editor]);

  return null;
}
