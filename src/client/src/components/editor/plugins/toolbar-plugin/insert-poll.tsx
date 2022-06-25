import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { FC, useState } from 'react';
import { Input, useDisclosure } from '@chakra-ui/react';
import { toast } from '@/utils/toast';
import { MyModal } from '@/components/modal';
import { INSERT_POLL_COMMAND } from '../poll-plugin';

interface InsertTableDialogProps {
  visible: boolean;
  onVisibleChange: (visible: boolean) => void;
}

const InsetTableDialog: FC<InsertTableDialogProps> = props => {
  const { visible, onVisibleChange } = props;
  const [editor] = useLexicalComposerContext();
  const [question, setQuestion] = useState('');
  const modalState = useDisclosure({ isOpen: visible });

  const onSubmitImage = async () => {
    if (!question) {
      toast.warning('请输入投票标题');
      return false;
    }
    editor.dispatchCommand(INSERT_POLL_COMMAND, question);
    onVisibleChange(false);
  };

  return (
    <MyModal onOk={onSubmitImage} title="插入投票" {...modalState}>
      <Input placeholder="投票标题" value={question} onChange={e => setQuestion(e.target.value)} />
    </MyModal>
  );
};

export default InsetTableDialog;
