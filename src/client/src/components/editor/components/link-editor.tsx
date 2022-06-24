import { css } from '@emotion/react';
import { EditLineIcon } from 'ultra-icon';
import { $isLinkNode, TOGGLE_LINK_COMMAND } from '@lexical/link';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { mergeRegister } from '@lexical/utils';
import { $getSelection, $isRangeSelection, SELECTION_CHANGE_COMMAND } from 'lexical';
import { FC, useCallback, useEffect, useRef, useState } from 'react';
import { Input, Popover, Tooltip } from '@chakra-ui/react';
import getSelectedNode from '../utils/get-selected-node';

const LowPriority = 1;

function positionEditorElement(editor: HTMLElement, rect: DOMRect) {
  if (rect === null) {
    editor.style.opacity = '0';
    editor.style.top = '-1000px';
    editor.style.left = '-1000px';
  } else {
    editor.style.opacity = '1';
    editor.style.top = `${rect.top + rect.height + window.pageYOffset + 10}px`;
    editor.style.left = `${rect.left + window.pageXOffset + rect.width / 2}px`;
  }
}

const LinkEditor: FC = () => {
  const [editor] = useLexicalComposerContext();
  const editorRef = useRef(null);
  const inputRef = useRef(null);
  const mouseDownRef = useRef(false);
  const [linkUrl, setLinkUrl] = useState('');
  const [isEditMode, setEditMode] = useState(false);
  const [lastSelection, setLastSelection] = useState(null);

  const updateLinkEditor = useCallback(() => {
    const selection = $getSelection();

    if ($isRangeSelection(selection)) {
      const node = getSelectedNode(selection);
      const parent = node.getParent();

      if ($isLinkNode(parent)) {
        setLinkUrl(parent.getURL());
      } else if ($isLinkNode(node)) {
        setLinkUrl(node.getURL());
      } else {
        setLinkUrl('');
      }
    }
    const editorElem = editorRef.current?.layerElement;
    const nativeSelection = window.getSelection();
    const activeElement = document.activeElement;

    if (!editorElem) {
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
        positionEditorElement(editorElem, rect);
      }
      setLastSelection(selection);
    } else if (!activeElement || activeElement.className !== 'link-input') {
      positionEditorElement(editorElem, null);
      setLastSelection(null);
      setEditMode(false);
      setLinkUrl('');
    }

    return true;
  }, [editor]);

  useEffect(() => {
    return mergeRegister(
      editor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
          updateLinkEditor();
        });
      }),

      editor.registerCommand(
        SELECTION_CHANGE_COMMAND,
        () => {
          updateLinkEditor();

          return true;
        },
        LowPriority,
      ),
    );
  }, [editor, updateLinkEditor]);

  useEffect(() => {
    if (isEditMode && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditMode]);

  return null;

  // return (
  //   <Popover
  //     isOpen={true}
  //     ref={editorRef}
  //     css={linkEditorStyle}
  //     content={
  //       isEditMode ? (
  //         <Input
  //           ref={inputRef}
  //           value={linkUrl}
  //           onChange={value => {
  //             setLinkUrl(value);
  //           }}
  //           onKeyDown={event => {
  //             if (event.key === 'Enter') {
  //               event.preventDefault();
  //               if (lastSelection !== null) {
  //                 if (linkUrl !== '') {
  //                   editor.dispatchCommand(TOGGLE_LINK_COMMAND, linkUrl);
  //                 }
  //                 setEditMode(false);
  //               }
  //             } else if (event.key === 'Escape') {
  //               event.preventDefault();
  //               setEditMode(false);
  //             }
  //           }}
  //         />
  //       ) : (
  //         <>
  //           <div className="link-input">
  //             <a href={linkUrl} target="_blank" rel="noopener noreferrer">
  //               {linkUrl}
  //             </a>
  //             <Tooltip title="编辑">
  //               <span>
  //                 <EditLineIcon
  //                   className="edit-icon"
  //                   size={18}
  //                   onMouseDown={event => event.preventDefault()}
  //                   onClick={() => {
  //                     setEditMode(true);
  //                   }}
  //                 />
  //               </span>
  //             </Tooltip>
  //           </div>
  //         </>
  //       )
  //     }
  //   ></Popover>
  // );
};

export default LinkEditor;

const linkEditorStyle = css`
  .link-input {
    display: flex;
    align-items: center;
    .edit-icon {
      margin-left: 20px;
      cursor: pointer;
    }
  }
`;
