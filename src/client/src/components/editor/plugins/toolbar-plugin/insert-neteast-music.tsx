import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { FC, useState } from 'react';
import { Input, UseDisclosureReturn } from '@chakra-ui/react';
import { toast } from '@/utils/toast';
import { MyModal } from '@/components/modal';
import getUrlParam from '../../utils/get-url-param';
import { INSERT_NETEAST_MUSIC_COMMAND } from '../neteast-music-plugin';

interface InsertNesteastMusicDialogProps extends UseDisclosureReturn {}

const InsetNesteastMusicDialog: FC<InsertNesteastMusicDialogProps> = props => {
  const [editor] = useLexicalComposerContext();
  const [url, setUrl] = useState('https://music.163.com/#/song?id=1945895585');

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
    props.onClose();
  };

  return (
    <MyModal onOk={onSubmitImage} title="插入网易云音乐" {...props}>
      <Input placeholder="网易云音乐链接" value={url} onChange={e => setUrl(e.target.value)} />
    </MyModal>
  );
};

export default InsetNesteastMusicDialog;
