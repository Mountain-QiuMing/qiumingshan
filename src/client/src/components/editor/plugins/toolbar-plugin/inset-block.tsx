import { Select } from '@chakra-ui/react';
import { $wrapLeafNodesInElements } from '@lexical/selection';
import { $createHeadingNode, HeadingTagType } from '@lexical/rich-text';
import { $getSelection, $isRangeSelection, $createParagraphNode } from 'lexical';
import { ChangeEvent, FC } from 'react';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';

interface InsertBlockProps {
  blockType: string;
  setBlockType: (blockType: string) => void;
}

const InsertBlock: FC<InsertBlockProps> = props => {
  const { blockType, setBlockType } = props;
  const [editor] = useLexicalComposerContext();
  const formatParagraph = () => {
    if (blockType !== 'paragraph') {
      editor.update(() => {
        const selection = $getSelection();

        if ($isRangeSelection(selection)) {
          $wrapLeafNodesInElements(selection, () => $createParagraphNode());
        }
      });
    }
  };

  const formatHeading = (headingType: HeadingTagType) => {
    if (blockType !== headingType) {
      editor.update(() => {
        const selection = $getSelection();

        if ($isRangeSelection(selection)) {
          $wrapLeafNodesInElements(selection, () => $createHeadingNode(headingType));
        }
      });
    }
  };

  const typeMap = {
    paragraph: formatParagraph,
    h1: () => formatHeading('h1'),
    h2: () => formatHeading('h2'),
    h3: () => formatHeading('h3'),
    h4: () => formatHeading('h4'),
  };

  const onChangeBlockType = (e: ChangeEvent<HTMLSelectElement>) => {
    const type = e.target.value;
    setBlockType(type);
    typeMap[type]();
  };

  return (
    <Select
      value={Object.keys(typeMap).includes(blockType) ? blockType : 'paragraph'}
      onChange={onChangeBlockType}
      width={20}
    >
      <option label="正文" value="paragraph"></option>
      <option label="标题1" value="h1"></option>
      <option label="标题2" value="h2"></option>
      <option label="标题3" value="h3"></option>
      <option label="标题4" value="h4"></option>
    </Select>
  );
};

export default InsertBlock;
