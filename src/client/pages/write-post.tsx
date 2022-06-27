import { apiAddPost } from '@/api/post/publish-post';
import Editor from '@/components/editor';
import { toast } from '@/utils/toast';
import { Box, Button, Center, Heading, Input } from '@chakra-ui/react';
import { EditorState } from 'lexical';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Header from '../src/components/header';

export default function WritePost() {
  const [title, setTitle] = useState('这是一个标题');
  const [editorContent, setEditorContent] = useState('');
  const router = useRouter();

  const handleChange = (editorState: EditorState) => {
    editorState.read(() => {
      setEditorContent(JSON.stringify(editorState.toJSON()));
    });
  };

  const handlePublish = async () => {
    if (!title) return toast.error('请输入标题，不得少于5个字');
    if (!editorContent) return toast.error('请输入正文，不得少于10个字');

    const res = await apiAddPost({
      title,
      body: editorContent,
      tags: [{ name: 'tag1' }],
    });

    if (res.status) {
      toast.success('发布成功');
      router.replace(`/p/${res.result.id}`);
    }
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
          <Editor value={editorContent} onChange={handleChange} />
        </Box>
      </Center>
    </>
  );
}
