import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { FC, useState } from 'react';
import { Input, useDisclosure } from '@chakra-ui/react';
import { toast } from '@/utils/toast';
import { MyModal } from '@/components/modal';
import getUrlParam from '../../utils/get-url-param';
import { INSERT_NETEAST_MUSIC_COMMAND } from '../neteast-music-plugin';

interface InsertNesteastMusicDialogProps {
  visible: boolean;
  onVisibleChange: (visible: boolean) => void;
}

const InsetNesteastMusicDialog: FC<InsertNesteastMusicDialogProps> = props => {
  const { visible, onVisibleChange } = props;
  const [editor] = useLexicalComposerContext();
  const [url, setUrl] = useState('');
  const modalState = useDisclosure({ isOpen: visible });

  const onSubmitImage = async () => {
    if (!url) {
      toast.warning('请输入链接地址');
      return false;
    }

    const id = getUrlParam('id', url);
    if (!id) {
      return false;
    }
    editor.dispatchCommand(INSERT_NETEAST_MUSIC_COMMAND, id);
    onVisibleChange(false);
  };

  return (
    <MyModal onOk={onSubmitImage} title="插入网易云音乐" {...modalState}>
      <Input placeholder="网易云音乐链接" value={url} onChange={e => setUrl(e.target.value)} />
    </MyModal>
  );
};

export default InsetNesteastMusicDialog;
