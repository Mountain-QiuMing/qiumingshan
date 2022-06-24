import { useCollaborationContext } from '@lexical/react/LexicalCollaborationPlugin';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { useLexicalNodeSelection } from '@lexical/react/useLexicalNodeSelection';
import {
  $getNodeByKey,
  $getSelection,
  $isNodeSelection,
  CLICK_COMMAND,
  COMMAND_PRIORITY_LOW,
  DecoratorNode,
  DOMConversionMap,
  DOMConversionOutput,
  DOMExportOutput,
  GridSelection,
  KEY_BACKSPACE_COMMAND,
  KEY_DELETE_COMMAND,
  LexicalNode,
  NodeKey,
  NodeSelection,
  RangeSelection,
  SerializedLexicalNode,
  Spread,
} from 'lexical';
import { mergeRegister } from '@lexical/utils';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { css } from '@emotion/react';
import { Button, Checkbox, Input } from '@chakra-ui/react';
import { CloseLineIcon } from 'ultra-icon';
import clsx from 'clsx';

type Options = ReadonlyArray<Option>;

type Option = {
  text: string;
  uid: string;
  votes: Array<number>;
};

function createUID(): string {
  return Math.random()
    .toString(36)
    .replace(/[^a-z]+/g, '')
    .substr(0, 5);
}

function createPollOption(text = ''): Option {
  return {
    text,
    uid: createUID(),
    votes: [],
  };
}

function cloneOption(option: Option, text: string, votes?: Array<number>): Option {
  return {
    text,
    uid: option.uid,
    votes: votes || Array.from(option.votes),
  };
}

function getTotalVotes(options: Options): number {
  return options.reduce((totalVotes, next) => {
    return totalVotes + next.votes.length;
  }, 0);
}

function PollOptionComponent({
  option,
  index,
  options,
  totalVotes,
  withPollNode,
}: {
  index: number;
  option: Option;
  options: Options;
  totalVotes: number;
  withPollNode: (d: (d: PollNode) => void) => void;
}) {
  const { clientID } = useCollaborationContext();
  const votesArray = option.votes;
  const checkedIndex = votesArray.indexOf(clientID);
  const checked = checkedIndex !== -1;
  const votes = votesArray.length;
  const text = option.text;

  return (
    <div className="PollNode__optionContainer">
      <Checkbox
        className="PollNode__optionCheckbox"
        onChange={() => {
          withPollNode(node => {
            node.toggleVote(option, clientID);
          });
        }}
        checked={checked}
      />
      <div className="PollNode__optionInputWrapper">
        <div
          className="PollNode__optionInputVotes"
          style={{ width: `${votes === 0 ? 0 : (votes / totalVotes) * 100}%` }}
        />
        <span className="PollNode__optionInputVotesCount">
          {votes > 0 && (votes === 1 ? '1 票' : `${votes} votes`)}
        </span>
        <Input
          className="PollNode__optionInput"
          type="text"
          value={text}
          onChange={e => {
            withPollNode(node => {
              node.setOptionText(option, e.target.value);
            });
          }}
          placeholder={`选项 ${index + 1}`}
        />
      </div>
      <Button
        disabled={options.length < 3}
        className={'PollNode__optionDelete' + (options.length < 3 ? ' PollNode__optionDeleteDisabled' : '')}
        arial-label="Remove"
        onClick={() => {
          withPollNode(node => {
            node.deleteOption(option);
          });
        }}
      >
        <CloseLineIcon />
      </Button>
    </div>
  );
}

function PollComponent({ question, options, nodeKey }: { nodeKey: NodeKey; options: Options; question: string }) {
  const [editor] = useLexicalComposerContext();
  const totalVotes = useMemo(() => getTotalVotes(options), [options]);
  const [isSelected, setSelected, clearSelection] = useLexicalNodeSelection(nodeKey);
  const [selection, setSelection] = useState<RangeSelection | NodeSelection | GridSelection | null>(null);
  const ref = useRef(null);

  const onDelete = useCallback(
    (payload: KeyboardEvent) => {
      if (isSelected && $isNodeSelection($getSelection())) {
        const event: KeyboardEvent = payload;
        event.preventDefault();
        const node = $getNodeByKey(nodeKey);
        if ($isPollNode(node)) {
          node.remove();
        }
        setSelected(false);
      }
      return false;
    },
    [isSelected, nodeKey, setSelected],
  );

  useEffect(() => {
    return mergeRegister(
      editor.registerUpdateListener(({ editorState }) => {
        setSelection(editorState.read(() => $getSelection()));
      }),
      editor.registerCommand<MouseEvent>(
        CLICK_COMMAND,
        payload => {
          const event = payload;

          if (event.target === ref.current) {
            if (!event.shiftKey) {
              clearSelection();
            }
            setSelected(!isSelected);
            return true;
          }

          return false;
        },
        COMMAND_PRIORITY_LOW,
      ),
      editor.registerCommand(KEY_DELETE_COMMAND, onDelete, COMMAND_PRIORITY_LOW),
      editor.registerCommand(KEY_BACKSPACE_COMMAND, onDelete, COMMAND_PRIORITY_LOW),
    );
  }, [clearSelection, editor, isSelected, nodeKey, onDelete, setSelected]);

  const withPollNode = (cb: (node: PollNode) => void): void => {
    editor.update(() => {
      const node = $getNodeByKey(nodeKey);
      if ($isPollNode(node)) {
        cb(node);
      }
    });
  };

  const addOption = () => {
    withPollNode(node => {
      node.addOption(createPollOption());
    });
  };

  const isFocused = $isNodeSelection(selection) && isSelected;

  return (
    <div className={clsx('PollNode__container', isFocused && 'focused')} css={pollNodeStyles()}>
      <h2 className="PollNode__heading">{question}</h2>
      {options.map((option, index) => {
        const key = option.uid;

        return (
          <PollOptionComponent
            key={key}
            withPollNode={withPollNode}
            option={option}
            index={index}
            options={options}
            totalVotes={totalVotes}
          />
        );
      })}
      <div className="PollNode__footer">
        <Button onClick={addOption} size="small">
          添加选项
        </Button>
      </div>
    </div>
  );
}

const pollNodeStyles = () => {
  return css`
    &.PollNode__container.focused {
      outline: 2px solid rgb(60, 132, 244);
    }
    border: 1px solid #eee;
    background-color: #fcfcfc;
    padding: 15px;
    border-radius: 10px;
    max-width: 600px;
    min-width: 400px;
    .PollNode__heading {
      margin-left: 0px;
      margin-top: 0px;
      margin-right: 0px;
      margin-bottom: 15px;
      color: #444;
      text-align: center;
      font-size: 18px;
    }
    .PollNode__optionContainer {
      display: flex;
      flex-direction: row;
      margin-bottom: 10px;
      align-items: center;
    }
    .PollNode__optionInputWrapper {
      display: flex;
      flex: 10px;
      border-radius: 5px;
      position: relative;
      overflow: hidden;
      cursor: pointer;
    }
    .PollNode__optionInput {
      display: flex;
      flex: 1px;
      background-color: transparent;
      font-weight: bold;
      outline: 0px;
      z-index: 0;
    }
    .PollNode__optionInput::placeholder {
      font-weight: normal;
      color: #999;
    }
    .PollNode__optionInputVotes {
      background-color: rgb(236, 243, 254);
      height: 100%;
      position: absolute;
      top: 0px;
      left: 0px;
      transition: width 1s ease;
      z-index: 0;
    }
    .PollNode__optionInputVotesCount {
      color: rgb(61, 135, 245);
      position: absolute;
      right: 15px;
      font-size: 12px;
      top: 5px;
    }
    .PollNode__optionCheckboxWrapper {
      position: relative;
      display: flex;
      width: 22px;
      height: 22px;
      border: 1px solid #999;
      margin-right: 10px;
      border-radius: 5px;
    }
    .PollNode__optionCheckboxChecked {
      border: 1px solid rgb(61, 135, 245);
      background-color: rgb(61, 135, 245);
      background-position: 3px 3px;
      background-repeat: no-repeat;
    }
    .PollNode__optionCheckbox {
      border: 0px;
      position: absolute;
      display: block;
      width: 100%;
      height: 100%;
      opacity: 0;
      cursor: pointer;
    }
    .PollNode__optionDelete {
      display: flex;
      width: 28px;
      height: 28px;
      margin-left: 6px;
      border: 0px;
      background-color: transparent;
      background-position: 6px 6px;
      background-repeat: no-repeat;
      z-index: 0;
      cursor: pointer;
      border-radius: 5px;
      opacity: 0.3;
    }
    .PollNode__optionDelete:hover {
      opacity: 1;
      background-color: #eee;
    }
    .PollNode__optionDeleteDisabled {
      cursor: not-allowed;
    }
    .PollNode__optionDeleteDisabled:hover {
      opacity: 0.3;
      background-color: transparent;
    }
    .PollNode__footer {
      display: flex;
      justify-content: center;
    }
  `;
};

function convertPollElement(domNode: HTMLElement): DOMConversionOutput | null {
  const question = domNode.getAttribute('data-lexical-poll-question');
  if (question !== null) {
    const node = $createPollNode(question);
    return { node };
  }
  return null;
}

export type SerializedPollNode = Spread<
  {
    question: string;
    options: Options;
    type: 'poll';
    version: 1;
  },
  SerializedLexicalNode
>;

export class PollNode extends DecoratorNode<React.ReactNode> {
  __question: string;
  __options: Options;

  static getType(): string {
    return 'poll';
  }

  static clone(node: PollNode): PollNode {
    return new PollNode(node.__question, node.__options, node.__key);
  }

  static importJSON(serializedNode: SerializedPollNode): PollNode {
    const node = $createPollNode(serializedNode.question);
    serializedNode.options.forEach(node.addOption);
    return node;
  }

  constructor(question: string, options?: Options, key?: NodeKey) {
    super(key);
    this.__question = question;
    this.__options = options || [createPollOption(), createPollOption()];
  }

  exportJSON(): SerializedPollNode {
    return {
      options: this.__options,
      question: this.__question,
      type: 'poll',
      version: 1,
    };
  }

  addOption(option: Option): void {
    const self = this.getWritable();
    const options = Array.from(self.__options);

    options.push(option);
    self.__options = options;
  }

  deleteOption(option: Option): void {
    const self = this.getWritable();
    const options = Array.from(self.__options);
    const index = options.indexOf(option);

    options.splice(index, 1);
    self.__options = options;
  }

  setOptionText(option: Option, text: string): void {
    const self = this.getWritable();
    const clonedOption = cloneOption(option, text);
    const options = Array.from(self.__options);
    const index = options.indexOf(option);

    options[index] = clonedOption;
    self.__options = options;
  }

  toggleVote(option: Option, clientID: number): void {
    const self = this.getWritable();
    const votes = option.votes;
    const votesClone = Array.from(votes);
    const voteIndex = votes.indexOf(clientID);

    if (voteIndex === -1) {
      votesClone.push(clientID);
    } else {
      votesClone.splice(voteIndex, 1);
    }
    const clonedOption = cloneOption(option, option.text, votesClone);
    const options = Array.from(self.__options);
    const index = options.indexOf(option);

    options[index] = clonedOption;
    self.__options = options;
  }

  static importDOM(): DOMConversionMap | null {
    return {
      span: (domNode: HTMLElement) => {
        if (!domNode.hasAttribute('data-lexical-poll-question')) {
          return null;
        }
        return {
          conversion: convertPollElement,
          priority: 2,
        };
      },
    };
  }

  exportDOM(): DOMExportOutput {
    const element = document.createElement('span');
    element.setAttribute('data-lexical-poll-question', this.__question);
    return { element };
  }

  createDOM(): HTMLElement {
    const elem = document.createElement('span');
    elem.style.display = 'inline-block';
    return elem;
  }

  updateDOM(): false {
    return false;
  }

  decorate() {
    return <PollComponent question={this.__question} options={this.__options} nodeKey={this.__key} />;
  }
}

export function $createPollNode(question: string): PollNode {
  return new PollNode(question);
}

export function $isPollNode(node: LexicalNode | null): node is PollNode {
  return node instanceof PollNode;
}
