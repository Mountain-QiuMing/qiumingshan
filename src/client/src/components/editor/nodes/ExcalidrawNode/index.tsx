import type { ExcalidrawElementFragment } from './excalidraw-modal';
import type {
  DOMConversionMap,
  DOMConversionOutput,
  DOMExportOutput,
  EditorConfig,
  LexicalEditor,
  LexicalNode,
  NodeKey,
  SerializedLexicalNode,
  Spread,
} from 'lexical';

import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { useLexicalNodeSelection } from '@lexical/react/useLexicalNodeSelection';
import { mergeRegister } from '@lexical/utils';
import {
  $getNodeByKey,
  $getSelection,
  $isNodeSelection,
  CLICK_COMMAND,
  COMMAND_PRIORITY_LOW,
  DecoratorNode,
  KEY_BACKSPACE_COMMAND,
  KEY_DELETE_COMMAND,
} from 'lexical';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import ImageResizer from '../../components/ImageResizer';
import dynamic from 'next/dynamic';
import { useDisclosure } from '@chakra-ui/react';

const ExcalidrawModal = dynamic(() => import('./excalidraw-modal'), { ssr: false });
const ExcalidrawImage = dynamic(() => import('./excalidraw-image'), { ssr: false });

function ExcalidrawComponent({ nodeKey, data }: { data: string; nodeKey: NodeKey }): JSX.Element {
  const [editor] = useLexicalComposerContext();
  const modalState = useDisclosure({ isOpen: data === '[]' && !editor.isReadOnly() });
  const imageContainerRef = useRef<HTMLImageElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const [isSelected, setSelected, clearSelection] = useLexicalNodeSelection(nodeKey);
  const [isResizing, setIsResizing] = useState<boolean>(false);

  const onDelete = useCallback(
    (event: KeyboardEvent) => {
      if (isSelected && $isNodeSelection($getSelection())) {
        event.preventDefault();
        editor.update(() => {
          const node = $getNodeByKey(nodeKey);
          if ($isExcalidrawNode(node)) {
            node.remove();
          }
          setSelected(false);
        });
      }
      return false;
    },
    [editor, isSelected, nodeKey, setSelected],
  );

  useEffect(() => {
    if (modalState.isOpen) {
      editor.setReadOnly(true);
    } else {
      editor.setReadOnly(false);
    }
  }, [modalState.isOpen, editor]);

  useEffect(() => {
    return mergeRegister(
      editor.registerCommand(
        CLICK_COMMAND,
        (event: MouseEvent) => {
          const buttonElem = buttonRef.current;
          const eventTarget = event.target;

          if (isResizing) {
            return true;
          }

          if (buttonElem !== null && buttonElem.contains(eventTarget as Node)) {
            if (!event.shiftKey) {
              clearSelection();
            }
            setSelected(!isSelected);
            if (event.detail > 1) {
              modalState.onOpen();
            }
            return true;
          }

          return false;
        },
        COMMAND_PRIORITY_LOW,
      ),
      editor.registerCommand(KEY_DELETE_COMMAND, onDelete, COMMAND_PRIORITY_LOW),
      editor.registerCommand(KEY_BACKSPACE_COMMAND, onDelete, COMMAND_PRIORITY_LOW),
    );
  }, [clearSelection, editor, isSelected, isResizing, onDelete, setSelected]);

  const deleteNode = useCallback(() => {
    modalState.onClose();
    return editor.update(() => {
      const node = $getNodeByKey(nodeKey);
      if ($isExcalidrawNode(node)) {
        node.remove();
      }
    });
  }, [editor, nodeKey]);

  const setData = (newData: ReadonlyArray<ExcalidrawElementFragment>) => {
    if (editor.isReadOnly()) {
      return;
    }
    return editor.update(() => {
      const node = $getNodeByKey(nodeKey);
      if ($isExcalidrawNode(node)) {
        if (newData.length > 0) {
          node.setData(JSON.stringify(newData));
        } else {
          node.remove();
        }
      }
    });
  };

  const onResizeStart = () => {
    setIsResizing(true);
  };

  const onResizeEnd = () => {
    setTimeout(() => {
      setIsResizing(false);
    }, 200);
  };

  const elements = useMemo(() => JSON.parse(data), [data]);
  return (
    <>
      <ExcalidrawModal
        initialElements={elements}
        onDelete={deleteNode}
        onHide={() => {
          editor.setReadOnly(false);
          modalState.onClose();
        }}
        onSave={newData => {
          editor.setReadOnly(false);
          setData(newData);
          modalState.onClose();
        }}
        {...modalState}
      />
      {elements.length > 0 && (
        <button ref={buttonRef} className={`excalidraw-button ${isSelected ? 'selected' : ''}`}>
          <ExcalidrawImage imageContainerRef={imageContainerRef} className="image" elements={elements} />
          {(isSelected || isResizing) && (
            <ImageResizer
              showCaption={true}
              setShowCaption={() => null}
              imageRef={imageContainerRef}
              editor={editor}
              onResizeStart={onResizeStart}
              onResizeEnd={onResizeEnd}
            />
          )}
        </button>
      )}
    </>
  );
}

export type SerializedExcalidrawNode = Spread<
  {
    data: string;
    type: 'excalidraw';
    version: 1;
  },
  SerializedLexicalNode
>;

function convertExcalidrawElement(domNode: HTMLElement): DOMConversionOutput | null {
  const excalidrawData = domNode.getAttribute('data-lexical-excalidraw-json');
  if (excalidrawData) {
    const node = $createExcalidrawNode();
    node.__data = excalidrawData;
    return {
      node,
    };
  }
  return null;
}

export class ExcalidrawNode extends DecoratorNode<JSX.Element> {
  __data: string;

  static getType(): string {
    return 'excalidraw';
  }

  static clone(node: ExcalidrawNode): ExcalidrawNode {
    return new ExcalidrawNode(node.__data, node.__key);
  }

  static importJSON(serializedNode: SerializedExcalidrawNode): ExcalidrawNode {
    return new ExcalidrawNode(serializedNode.data);
  }

  exportJSON(): SerializedExcalidrawNode {
    return {
      data: this.__data,
      type: 'excalidraw',
      version: 1,
    };
  }

  constructor(data = '[]', key?: NodeKey) {
    super(key);
    this.__data = data;
  }

  createDOM(config: EditorConfig): HTMLElement {
    const span = document.createElement('span');
    const theme = config.theme;
    const className = theme.image;
    if (className !== undefined) {
      span.className = className;
    }
    return span;
  }

  updateDOM(): false {
    return false;
  }

  static importDOM(): DOMConversionMap | null {
    return {
      span: (domNode: HTMLSpanElement) => {
        if (!domNode.hasAttribute('data-lexical-excalidraw-json')) {
          return null;
        }
        return {
          conversion: convertExcalidrawElement,
          priority: 1,
        };
      },
    };
  }

  exportDOM(editor: LexicalEditor): DOMExportOutput {
    const element = document.createElement('span');
    const content = editor.getElementByKey(this.getKey());
    if (content !== null) {
      const svg = content.querySelector('svg');
      if (svg !== null) {
        element.innerHTML = svg.outerHTML;
      }
    }
    element.setAttribute('data-lexical-excalidraw-json', this.__data);
    return { element };
  }

  setData(data: string): void {
    const self = this.getWritable();
    self.__data = data;
  }

  decorate(): JSX.Element {
    return <ExcalidrawComponent nodeKey={this.getKey()} data={this.__data} />;
  }
}

export function $createExcalidrawNode(): ExcalidrawNode {
  return new ExcalidrawNode();
}

export function $isExcalidrawNode(node: LexicalNode | null): node is ExcalidrawNode {
  return node instanceof ExcalidrawNode;
}
