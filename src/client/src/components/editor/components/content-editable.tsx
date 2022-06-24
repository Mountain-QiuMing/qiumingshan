import { css } from '@emotion/react';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { FC, ReactNode } from 'react';
import { EditorProps, useEditorPropsContext } from '../context/editor-props-context';

interface PlaceholderProps {
  className?: string;
  children?: ReactNode;
}

const Placeholder: FC<PlaceholderProps> = ({ className }) => {
  const editorProps = useEditorPropsContext();

  return (
    <ContentEditable
      css={!className && placeholderStyle(editorProps)}
      className={className || 'ContentEditable__root'}
      // style={{ caretColor: editorProps.theme === 'dark' ? '#fff' : 'rgb(5, 5, 5)' }}
    >
      请输入...
    </ContentEditable>
  );
};

export default Placeholder;

const placeholderStyle = (_editorProps: EditorProps) => css`
  min-height: 150px;
  border: 0;
  resize: none;
  cursor: text;
  font-size: 15px;
  display: block;
  position: relative;
  tab-size: 1;
  outline: 0;
  padding: 10px;
  overflow: auto;
  resize: vertical;
`;
