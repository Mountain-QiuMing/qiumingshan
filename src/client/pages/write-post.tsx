import { apiAddPost } from '@/api/post/publish-post';
import Editor from '@/components/editor';
import { toast } from '@/utils/toast';
import { Box, Button, Center, Heading, Input } from '@chakra-ui/react';
import { LexicalEditor } from 'lexical';
import { $generateHtmlFromNodes } from '@lexical/html';
import { useState } from 'react';
import Header from '../src/components/header';

export default function WritePost() {
  const [title, setTitle] = useState('');
  const [editor, setEditor] = useState<LexicalEditor>();

  const handlePublish = async () => {
    if (!title) return toast.error('请输入标题，不得少于5个字');
    console.log(editor);
    console.log(editor._rootElement.innerHTML);
    // if (!editorContent) return toast.error('请输入正文，不得少于10个字');

    // console.log(editor._rootElement.innerHTML);

    // const res = await apiAddPost({
    //   title,
    //   body: editorContent,
    //   tags: [{ id: '1', name: '1' }],
    // });

    // if (res.status) {
    //   toast.success('发布成功');
    // }
  };
  return (
    <>
      <Header justifyContent="space-between" px="10">
        <Heading fontSize={['small', 'medium', 'large']}>写文章</Heading>
        <Button colorScheme="primary" onClick={handlePublish}>
          发布
        </Button>
      </Header>
      <Center>
        <Box width="100%" maxWidth="1100px">
          <Input
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="请输入标题（最多50个字）"
            maxLength={50}
            size="lg"
          />
          <Editor value={''} onChange={(_, editor) => setEditor(editor)} />
        </Box>
      </Center>
    </>
  );
}
