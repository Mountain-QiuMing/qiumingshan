import type { LexicalNode } from 'lexical';

import { CodeHighlightNode, CodeNode } from '@lexical/code';
import { HashtagNode } from '@lexical/hashtag';
import { AutoLinkNode, LinkNode } from '@lexical/link';
import { ListItemNode, ListNode } from '@lexical/list';
import { OverflowNode } from '@lexical/overflow';
import { HorizontalRuleNode } from '@lexical/react/LexicalHorizontalRuleNode';
import { HeadingNode, QuoteNode } from '@lexical/rich-text';
import { TableCellNode, TableNode, TableRowNode } from '@lexical/table';

import { EmojiNode } from './emoji-node';
import { EquationNode } from './equation-node';
import { ExcalidrawNode } from './ExcalidrawNode';
import { ImageNode } from './image-node';
import { KeywordNode } from './keyword-node';
import { MentionNode } from './mention-node';
import { PollNode } from './poll-node';
// import { StickyNode } from './StickyNode';
import { TypeaheadNode } from './typeahead-node';
import { NeteastMusicNode } from './neteast-music-node';

const PlaygroundNodes: Array<new (...args: any[]) => LexicalNode> = [
  HeadingNode,
  ListNode,
  ListItemNode,
  QuoteNode,
  CodeNode,
  TableNode,
  TableCellNode,
  TableRowNode,
  HashtagNode,
  CodeHighlightNode,
  AutoLinkNode,
  LinkNode,
  OverflowNode,
  PollNode,
  // StickyNode,
  ImageNode,
  MentionNode,
  EmojiNode,
  ExcalidrawNode,
  EquationNode,
  TypeaheadNode,
  KeywordNode,
  HorizontalRuleNode,
  NeteastMusicNode,
].filter(Boolean);

export default PlaygroundNodes;
