import type { EditorConfig, LexicalNode, NodeKey, SerializedLexicalNode, Spread } from 'lexical';

import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { mergeRegister } from '@lexical/utils';
import {
  $getNodeByKey,
  COMMAND_PRIORITY_HIGH,
  DecoratorNode,
  KEY_ESCAPE_COMMAND,
  SELECTION_CHANGE_COMMAND,
} from 'lexical';
import { FC, useCallback, useEffect, useRef, useState } from 'react';

import KatexRenderer from '../components/katex-renderer';
import EquationModal from '../components/equation-modal';

export type EquationComponentProps = {
  equation: string;
  inline: boolean;
  nodeKey: NodeKey;
};

const EquationComponent: FC<EquationComponentProps> = ({ equation, inline, nodeKey }) => {
  const [editor] = useLexicalComposerContext();

  const [equationValue, setEquationValue] = useState(equation || '');
  const [showEquationEditor, setShowEquationEditor] = useState<boolean>(false);
  const inputRef = useRef(null);

  const onHide = useCallback(
    (restoreSelection?: boolean) => {
      setShowEquationEditor(false);
      editor.update(() => {
        const node = $getNodeByKey(nodeKey);

        if ($isEquationNode(node)) {
          node.setEquation(equationValue);
          if (restoreSelection) {
            node.selectNext(0, 0);
          }
        }
      });
    },
    [editor, equationValue, nodeKey],
  );

  useEffect(() => {
    if (showEquationEditor) {
      return mergeRegister(
        editor.registerCommand(
          SELECTION_CHANGE_COMMAND,
          () => {
            const activeElement = document.activeElement;
            const inputElem = inputRef.current;

            if (inputElem !== activeElement) {
              onHide();
            }

            return false;
          },
          COMMAND_PRIORITY_HIGH,
        ),
        editor.registerCommand(
          KEY_ESCAPE_COMMAND,
          () => {
            const activeElement = document.activeElement;
            const inputElem = inputRef.current;

            if (inputElem === activeElement) {
              onHide(true);

              return true;
            }

            return false;
          },
          COMMAND_PRIORITY_HIGH,
        ),
      );
    }
  }, [editor, onHide, showEquationEditor]);

  return (
    <>
      {showEquationEditor ? (
        // <EquationEditor equation={equationValue} setEquation={setEquationValue} inline={inline} inputRef={inputRef} />
        <EquationModal
          visible={showEquationEditor}
          onVisibleChange={setShowEquationEditor}
          equation={equation}
          inline={inline}
          onSubmit={setEquationValue}
        />
      ) : (
        <KatexRenderer
          equation={equationValue}
          inline={inline}
          onClick={() => {
            setShowEquationEditor(true);
          }}
        />
      )}
    </>
  );
};

export type SerializedEquationNode = Spread<
  {
    type: 'equation';
    equation: string;
    inline: boolean;
  },
  SerializedLexicalNode
>;

export class EquationNode extends DecoratorNode<JSX.Element> {
  __equation: string;
  __inline: boolean;

  static getType(): string {
    return 'equation';
  }

  static clone(node: EquationNode): EquationNode {
    return new EquationNode(node.__equation, node.__inline, node.__key);
  }

  constructor(equation: string, inline?: boolean, key?: NodeKey) {
    super(key);
    this.__equation = equation;
    this.__inline = inline ?? false;
  }

  static importJSON(serializedNode: SerializedEquationNode): EquationNode {
    const node = $createEquationNode(serializedNode.equation, serializedNode.inline);
    return node;
  }

  exportJSON(): SerializedEquationNode {
    return {
      equation: this.getEquation(),
      inline: this.__inline,
      type: 'equation',
      version: 1,
    };
  }

  createDOM(_config: EditorConfig): HTMLElement {
    return document.createElement(this.__inline ? 'span' : 'div');
  }

  updateDOM(prevNode: EquationNode): boolean {
    // If the inline property changes, replace the element
    return this.__inline !== prevNode.__inline;
  }

  getEquation(): string {
    return this.__equation;
  }

  setEquation(equation: string): void {
    const writable = this.getWritable();
    writable.__equation = equation;
  }

  decorate(): JSX.Element {
    return <EquationComponent equation={this.__equation} inline={this.__inline} nodeKey={this.__key} />;
  }
}

export function $createEquationNode(equation = '', inline = false): EquationNode {
  const equationNode = new EquationNode(equation, inline);
  return equationNode;
}

export function $isEquationNode(node: LexicalNode | null | undefined): node is EquationNode {
  return node instanceof EquationNode;
}
