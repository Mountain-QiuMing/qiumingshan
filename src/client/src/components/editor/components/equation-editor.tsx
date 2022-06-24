import { css } from '@emotion/react';
import { FC, RefObject } from 'react';

type BaseEquationEditorProps = {
  equation: string;
  inline: boolean;
  inputRef: { current: null | HTMLElement };
  setEquation: (string) => void;
};

const EquationEditor: FC<BaseEquationEditorProps> = ({ equation, setEquation, inline, inputRef }) => {
  const onChange = event => {
    setEquation(event.target.value);
  };

  const props = {
    equation,
    inputRef,
    onChange,
  };

  return inline ? <InlineEquationEditor {...props} /> : <BlockEquationEditor {...props} />;
};

export default EquationEditor;

type EquationEditorImplProps = {
  equation: string;
  inputRef: { current: null | HTMLElement };
  onChange: (event: React.ChangeEvent<HTMLElement>) => void;
};

function InlineEquationEditor({ equation, onChange, inputRef }: EquationEditorImplProps): JSX.Element {
  return (
    <span css={equationEditorStyle} className="EquationEditor_inputBackground">
      <span className="EquationEditor_dollarSign">$</span>
      <input
        className="EquationEditor_inlineEditor"
        value={equation}
        onChange={onChange}
        autoFocus={true}
        ref={inputRef as RefObject<HTMLInputElement>}
      />
      <span className="EquationEditor_dollarSign">$</span>
    </span>
  );
}

function BlockEquationEditor({ equation, onChange, inputRef }: EquationEditorImplProps): JSX.Element {
  return (
    <div css={equationEditorStyle} className="EquationEditor_inputBackground">
      <span className="EquationEditor_dollarSign">{'$$\n'}</span>
      <textarea
        className="EquationEditor_blockEditor"
        value={equation}
        onChange={onChange}
        ref={inputRef as RefObject<HTMLTextAreaElement>}
      />
      <span className="EquationEditor_dollarSign">{'\n$$'}</span>
    </div>
  );
}

const equationEditorStyle = css`
  background-color: #eee;
  .EquationEditor_inlineEditor {
    padding: 0;
    margin: 0;
    border: 0;
    outline: 0;
    color: #8421a2;
    background-color: inherit;
    resize: none;
  }

  .EquationEditor_blockEditor {
    padding: 0;
    margin: 0;
    border: 0;
    outline: 0;
    color: #8421a2;
    background-color: inherit;
    resize: none;
    width: '100%';
  }

  .EquationEditor_dollarSign {
    text-align: left;
    color: #b0b0b0;
  }
`;
