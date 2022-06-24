import { css } from '@emotion/react';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { FC, useState } from 'react';
import { Checkbox, Input, ModalHeader, Textarea, useDisclosure } from '@chakra-ui/react';
import { INSERT_EQUATION_COMMAND } from '../plugins/equations-plugin';
import KatexRenderer from './katex-renderer';
import { MyModal } from '../../modal';

type Props = {
  visible: boolean;
  onVisibleChange: (visible: boolean) => void;
  onSubmit?: (equation: string) => void;
  inline?: boolean;
  equation?: string;
};

const EquationModal: FC<Props> = props => {
  const { visible, onVisibleChange, onSubmit, inline: defaultInline, equation: defaultEquation } = props;
  const [editor] = useLexicalComposerContext();

  const [equation, setEquation] = useState<string>(defaultEquation || '');
  const [inline, setInline] = useState<boolean>(defaultInline || true);
  const modalState = useDisclosure({ isOpen: visible });

  const onOk = () => {
    editor.dispatchCommand(INSERT_EQUATION_COMMAND, { equation, inline });
    onSubmit?.(equation);
    onVisibleChange(false);
  };

  return (
    <MyModal css={equationModalStyle} {...modalState} onOk={onOk}>
      <ModalHeader>{`${defaultEquation ? '编辑' : '插入'}公式`}</ModalHeader>
      <div className="KatexEquationAlterer_inline-checkbox">
        <Checkbox checked={inline} onChange={e => setInline(e.target.checked)}>
          行内展示
        </Checkbox>
      </div>
      <div>
        {inline ? (
          <Input
            onChange={e => {
              setEquation(e.target.value);
            }}
            value={equation}
            className="KatexEquationAlterer_textArea"
          />
        ) : (
          <Textarea
            onChange={e => {
              setEquation(e.target.value);
            }}
            value={equation}
            className="KatexEquationAlterer_textArea"
          />
        )}
      </div>
      <div className="KatexEquationAlterer_previrew">预览</div>
      <div className="KatexEquationAlterer_katex">
        <KatexRenderer equation={equation} inline={false} onClick={() => null} />
      </div>
    </MyModal>
  );
};

export default EquationModal;

const equationModalStyle = css`
  .KatexEquationAlterer_inline-checkbox {
    text-align: right;
  }
  .KatexEquationAlterer_previrew {
    margin: 20px 0;
    text-align: center;
  }
  .KatexEquationAlterer_katex {
    display: flex;
    flex-direction: 'row';
    margin-top: 10px;
    margin-bottom: 10px;
    justify-content: center;
    overflow: hidden;
  }
  .KatexEquationAlterer_textArea {
    width: 100%;
    margin: 10px 0;
  }
`;
