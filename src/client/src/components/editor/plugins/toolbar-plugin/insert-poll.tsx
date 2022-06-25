import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { FC, useState } from 'react';
import { Input, UseDisclosureReturn } from '@chakra-ui/react';
import { toast } from '@/utils/toast';
import { MyModal } from '@/components/modal';
import { INSERT_POLL_COMMAND } from '../poll-plugin';

interface InsertTableDialogProps extends UseDisclosureReturn {}

const InsetTableDialog: FC<InsertTableDialogProps> = props => {
  const [editor] = useLexicalComposerContext();
  const [question, setQuestion] = useState('');

  const onSubmitImage = async () => {
    if (!question) {
      toast.warning('请输入投票标题');
      return false;
    }
    editor.dispatchCommand(INSERT_POLL_COMMAND, question);
    props.onClose();
  };

  return (
    <MyModal onOk={onSubmitImage} title="插入投票" {...props}>
      <Input placeholder="投票标题" value={question} onChange={e => setQuestion(e.target.value)} />
    </MyModal>
  );
};

export default InsetTableDialog;
