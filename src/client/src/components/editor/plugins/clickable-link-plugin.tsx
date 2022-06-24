import type { LinkNode } from '@lexical/link';
import type { LexicalEditor } from 'lexical';

import { $isLinkNode } from '@lexical/link';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $getNearestNodeFromDOMNode } from 'lexical';
import { FC, useEffect, useRef } from 'react';

type LinkFilter = (event: MouseEvent, linkNode: LinkNode) => boolean;

interface ClickableLinkPluginProps {
  filter?: LinkFilter;
  newTab?: boolean;
}

const ClickableLinkPlugin: FC<ClickableLinkPluginProps> = ({ filter, newTab = true }) => {
  const [editor] = useLexicalComposerContext();
  const hasMoved = useRef(false);

  useEffect(() => {
    let prevOffsetX;
    let prevOffsetY;

    function onPointerDown(event: PointerEvent) {
      prevOffsetX = event.offsetX;
      prevOffsetY = event.offsetY;
    }

    function onPointerUp(event: PointerEvent) {
      hasMoved.current = event.offsetX !== prevOffsetX || event.offsetY !== prevOffsetY;
    }

    function onClick(e: Event) {
      const hasMovedDuringClick = hasMoved.current;

      hasMoved.current = false;
      const event = e as MouseEvent;
      const linkDomNode = getLinkDomNode(event, editor);

      if (linkDomNode === null) {
        return;
      }

      const href = linkDomNode.getAttribute('href');

      if (linkDomNode.getAttribute('contenteditable') === 'false' || href === undefined) {
        return;
      }

      let linkNode = null;

      editor.update(() => {
        const maybeLinkNode = $getNearestNodeFromDOMNode(linkDomNode);

        if ($isLinkNode(maybeLinkNode)) {
          linkNode = maybeLinkNode;
        }
      });

      if (linkNode === null || (filter !== undefined && !filter(event, linkNode))) {
        return;
      }

      if (hasMovedDuringClick) {
        return;
      }

      try {
        window.open(href, newTab || event.metaKey || event.ctrlKey ? '_blank' : '_self');
      } catch {
        // It didn't work, which is better than throwing an exception!
      }
    }

    return editor.registerRootListener((rootElement: null | HTMLElement, prevRootElement: null | HTMLElement) => {
      if (prevRootElement !== null) {
        prevRootElement.removeEventListener('pointerdown', onPointerDown);
        prevRootElement.removeEventListener('pointerup', onPointerUp);
        prevRootElement.removeEventListener('click', onClick);
      }

      if (rootElement !== null) {
        rootElement.addEventListener('click', onClick);
        rootElement.addEventListener('pointerdown', onPointerDown);
        rootElement.addEventListener('pointerup', onPointerUp);
      }
    });
  }, [editor, filter, newTab]);

  return null;
};

export default ClickableLinkPlugin;

function isLinkDomNode(domNode: Node): boolean {
  return domNode.nodeName.toLowerCase() === 'a';
}

function getLinkDomNode(event: MouseEvent, editor: LexicalEditor): HTMLAnchorElement | null {
  return editor.getEditorState().read(() => {
    const domNode = event.target as Node;

    if (isLinkDomNode(domNode)) {
      return domNode as HTMLAnchorElement;
    }

    if (domNode.parentNode && isLinkDomNode(domNode.parentNode)) {
      return domNode.parentNode as HTMLAnchorElement;
    }

    return null;
  });
}
