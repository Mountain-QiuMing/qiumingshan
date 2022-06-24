import type { ElementNode, LexicalEditor, RangeSelection } from 'lexical';

import { $isCodeHighlightNode } from '@lexical/code';
import { $isLinkNode, TOGGLE_LINK_COMMAND } from '@lexical/link';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $isAtNodeEnd } from '@lexical/selection';
import { mergeRegister } from '@lexical/utils';
import {
  $getSelection,
  $isRangeSelection,
  $isTextNode,
  FORMAT_TEXT_COMMAND,
  SELECTION_CHANGE_COMMAND,
  TextNode,
  COMMAND_PRIORITY_LOW,
} from 'lexical';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Button, Divider, Popover, Tooltip } from 'ultra-design';
import { TriggerRef } from 'ultra-design/es/trigger/trigger';
import { BoldIcon, ItalicIcon, UnderlineIcon, StrikethroughIcon, CodeSSlashLineIcon, LinksLineIcon } from 'ultra-icon';
import { css } from '@emotion/react';

function setPopupPosition(editor: HTMLElement, rect: DOMRect, rootElementRect: DOMRect): void {
  let top = rect.top - 8 + window.pageYOffset;
  let left = rect.left + 310 + window.pageXOffset - editor.offsetWidth + rect.width;

  if (rect.width >= rootElementRect.width - 20 || left > rootElementRect.width - 150) {
    left = rect.left;
    top = rect.top - 50 + window.pageYOffset;
  }
  if (top < rootElementRect.top) {
    top = rect.bottom + 20;
  }
  editor.style.opacity = '1';
  editor.style.top = `${top}px`;
  editor.style.left = `${left}px`;
}

function FloatingCharacterStylesEditor({
  editor,
  isLink,
  isBold,
  isItalic,
  isUnderline,
  isCode,
  isStrikethrough,
}: {
  editor: LexicalEditor;
  isBold: boolean;
  isCode: boolean;
  isItalic: boolean;
  isLink: boolean;
  isStrikethrough: boolean;
  isUnderline: boolean;
}) {
  const popupCharStylesEditorRef = useRef<TriggerRef>(null);
  const mouseDownRef = useRef(false);

  const insertLink = useCallback(() => {
    if (!isLink) {
      editor.dispatchCommand(TOGGLE_LINK_COMMAND, 'https://');
    } else {
      editor.dispatchCommand(TOGGLE_LINK_COMMAND, null);
    }
  }, [editor, isLink]);

  const updateCharacterStylesEditor = useCallback(() => {
    const selection = $getSelection();

    const popupCharStylesEditorElem = popupCharStylesEditorRef.current?.layerElement;

    const nativeSelection = window.getSelection();

    if (popupCharStylesEditorElem === null) {
      return;
    }

    const rootElement = editor.getRootElement();

    if (
      selection !== null &&
      !nativeSelection.isCollapsed &&
      rootElement !== null &&
      rootElement.contains(nativeSelection.anchorNode)
    ) {
      const domRange = nativeSelection.getRangeAt(0);
      const rootElementRect = rootElement.getBoundingClientRect();
      let rect;

      if (nativeSelection.anchorNode === rootElement) {
        let inner = rootElement;

        while (inner.firstElementChild != null) {
          inner = inner.firstElementChild as HTMLElement;
        }

        rect = inner.getBoundingClientRect();
      } else {
        rect = domRange.getBoundingClientRect();
      }

      if (!mouseDownRef.current) {
        setPopupPosition(popupCharStylesEditorRef.current.layerElement, rect, rootElementRect);
      }
    }
  }, [editor]);

  useEffect(() => {
    editor.getEditorState().read(() => {
      updateCharacterStylesEditor();
    });

    return mergeRegister(
      editor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
          updateCharacterStylesEditor();
        });
      }),

      editor.registerCommand(
        SELECTION_CHANGE_COMMAND,
        () => {
          updateCharacterStylesEditor();

          return false;
        },
        COMMAND_PRIORITY_LOW,
      ),
    );
  }, [editor, updateCharacterStylesEditor]);

  useEffect(() => {
    const onResize = () => {
      editor.getEditorState().read(() => {
        updateCharacterStylesEditor();
      });
    };

    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
    };
  }, [editor, updateCharacterStylesEditor]);

  return (
    <Popover
      visible={true}
      ref={popupCharStylesEditorRef}
      placement="right"
      content={
        <div
          className="character-style-popup"
          css={css`
            .inline-toolbar-item {
              padding: 0 8px;
            }
          `}
        >
          <Tooltip title="加粗">
            <Button type="pure" className={'inline-toolbar-item ' + (isBold ? 'ultra-button--active' : '')}>
              <BoldIcon
                onClick={() => {
                  editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'bold');
                }}
              />
            </Button>
          </Tooltip>
          <Divider vertical />
          <Tooltip title="斜体">
            <Button
              type="pure"
              className={'inline-toolbar-item ' + (isItalic ? 'ultra-button--active' : '')}
              onClick={() => {
                editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'italic');
              }}
            >
              <ItalicIcon />
            </Button>
          </Tooltip>
          <Divider vertical />
          <Tooltip title="下划线">
            <Button
              type="pure"
              className={'inline-toolbar-item ' + (isUnderline ? 'ultra-button--active' : '')}
              onClick={() => {
                editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'underline');
              }}
            >
              <UnderlineIcon />
            </Button>
          </Tooltip>
          <Divider vertical />
          <Tooltip title="删除线">
            <Button
              type="pure"
              onClick={() => {
                editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'strikethrough');
              }}
              className={'inline-toolbar-item ' + (isStrikethrough ? 'active' : '')}
            >
              <StrikethroughIcon />
            </Button>
          </Tooltip>
          <Divider vertical />
          <Tooltip title="代码">
            <Button
              type="pure"
              onClick={() => {
                editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'code');
              }}
              className={'inline-toolbar-item ' + (isCode ? 'active' : '')}
            >
              <CodeSSlashLineIcon />
            </Button>
          </Tooltip>
          <Divider vertical />
          <Tooltip title="链接">
            <Button
              type="pure"
              onClick={insertLink}
              className={'inline-toolbar-item spaced ' + (isLink ? 'active' : '')}
            >
              <LinksLineIcon />
            </Button>
          </Tooltip>
        </div>
      }
    />
  );
}

function getSelectedNode(selection: RangeSelection): TextNode | ElementNode {
  const anchor = selection.anchor;
  const focus = selection.focus;
  const anchorNode = selection.anchor.getNode();
  const focusNode = selection.focus.getNode();

  if (anchorNode === focusNode) {
    return anchorNode;
  }
  const isBackward = selection.isBackward();

  if (isBackward) {
    return $isAtNodeEnd(focus) ? anchorNode : focusNode;
  } else {
    return $isAtNodeEnd(anchor) ? focusNode : anchorNode;
  }
}

function useCharacterStylesPopup(editor: LexicalEditor): JSX.Element {
  const [isText, setIsText] = useState(false);
  const [isLink, setIsLink] = useState(false);
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [isStrikethrough, setIsStrikethrough] = useState(false);
  const [isCode, setIsCode] = useState(false);

  const updatePopup = useCallback(() => {
    editor.getEditorState().read(() => {
      const selection = $getSelection();
      const nativeSelection = window.getSelection();
      const rootElement = editor.getRootElement();

      if (!$isRangeSelection(selection) || rootElement === null || !rootElement.contains(nativeSelection.anchorNode)) {
        setIsText(false);

        return;
      }

      const node = getSelectedNode(selection);

      setIsBold(selection.hasFormat('bold'));
      setIsItalic(selection.hasFormat('italic'));
      setIsUnderline(selection.hasFormat('underline'));
      setIsStrikethrough(selection.hasFormat('strikethrough'));
      setIsCode(selection.hasFormat('code'));

      // Update links
      const parent = node.getParent();

      if ($isLinkNode(parent) || $isLinkNode(node)) {
        setIsLink(true);
      } else {
        setIsLink(false);
      }

      if (!$isCodeHighlightNode(selection.anchor.getNode()) && selection.getTextContent() !== '') {
        setIsText($isTextNode(node));
      } else {
        setIsText(false);
      }
    });
  }, [editor]);

  useEffect(() => {
    document.addEventListener('selectionchange', updatePopup);

    return () => {
      document.removeEventListener('selectionchange', updatePopup);
    };
  }, [updatePopup]);

  useEffect(() => {
    return editor.registerUpdateListener(() => {
      updatePopup();
    });
  }, [editor, updatePopup]);

  if (!isText || isLink) {
    return null;
  }

  return (
    <FloatingCharacterStylesEditor
      editor={editor}
      isLink={isLink}
      isBold={isBold}
      isItalic={isItalic}
      isStrikethrough={isStrikethrough}
      isUnderline={isUnderline}
      isCode={isCode}
    />
  );
}

export default function CharacterStylesPopupPlugin(): JSX.Element {
  const [editor] = useLexicalComposerContext();

  return useCharacterStylesPopup(editor);
}
