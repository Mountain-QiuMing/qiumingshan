import type { ElementFormatType, LexicalNode, NodeKey, Spread } from 'lexical';

import { BlockWithAlignableContents } from '@lexical/react/LexicalBlockWithAlignableContents';
import { DecoratorBlockNode, SerializedDecoratorBlockNode } from '@lexical/react/LexicalDecoratorBlockNode';
import { FC } from 'react';

interface NeteastMusicComponentProps {
  format: ElementFormatType | null;
  nodeKey: NodeKey;
  videoID: string;
}

const NeteastMusicComponent: FC<NeteastMusicComponentProps> = ({ format, nodeKey, videoID }) => {
  return (
    <BlockWithAlignableContents className={{ base: '', focus: '' }} format={format} nodeKey={nodeKey}>
      <iframe
        frameBorder="no"
        marginWidth={0}
        marginHeight={0}
        width={330}
        height={86}
        src={`//music.163.com/outchain/player?type=2&id=${videoID}&auto=1&height=66`}
      />
    </BlockWithAlignableContents>
  );
};

export default NeteastMusicComponent;

export type SerializedYouTubeNode = Spread<
  {
    videoID: string;
    type: 'youtube';
    version: 1;
  },
  SerializedDecoratorBlockNode
>;

export class NeteastMusicNode extends DecoratorBlockNode {
  __id: string;

  static getType(): string {
    return 'NeteastMusic';
  }

  static clone(node: NeteastMusicNode): NeteastMusicNode {
    return new NeteastMusicNode(node.__id, node.__format, node.__key);
  }

  static importJSON(serializedNode: SerializedYouTubeNode): NeteastMusicNode {
    const node = $createNeteastMusicNode(serializedNode.videoID);
    node.setFormat(serializedNode.format);
    return node;
  }

  exportJSON(): SerializedYouTubeNode {
    return {
      ...super.exportJSON(),
      type: 'youtube',
      version: 1,
      videoID: this.__id,
    };
  }

  constructor(id: string, format?: ElementFormatType, key?: NodeKey) {
    super(format, key);
    this.__id = id;
  }

  updateDOM(): false {
    return false;
  }

  decorate(): JSX.Element {
    return <NeteastMusicComponent format={this.__format} nodeKey={this.getKey()} videoID={this.__id} />;
  }

  isTopLevel(): true {
    return true;
  }
}

export function $createNeteastMusicNode(videoID: string): NeteastMusicNode {
  return new NeteastMusicNode(videoID);
}

export function $isNeteastMusicNode(node: NeteastMusicNode | LexicalNode | null | undefined): node is NeteastMusicNode {
  return node instanceof NeteastMusicNode;
}
