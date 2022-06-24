import type { EditorConfig } from 'lexical';

import { TextNode } from 'lexical';

export class TypeaheadNode extends TextNode {
  static clone(node: TypeaheadNode): TypeaheadNode {
    return new TypeaheadNode(node.__text, node.__key);
  }

  static getType(): 'typeahead' {
    return 'typeahead';
  }

  createDOM(config: EditorConfig): HTMLElement {
    const dom = super.createDOM(config);

    dom.style.cssText = 'color: #ccc;';

    return dom;
  }
}

export function $createTypeaheadNode(text: string): TypeaheadNode {
  return new TypeaheadNode(text).setMode('inert');
}
