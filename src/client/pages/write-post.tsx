import Editor from '@/components/editor';
import { Box, Button, Center, Heading, Input } from '@chakra-ui/react';
import Header from '../src/components/header';

export default function WritePost() {
  return (
    <>
      <Header justifyContent="space-between" px="10">
        <Heading fontSize={['small', 'medium', 'large']}>写文章</Heading>
        <Button colorScheme="primary">发布</Button>
      </Header>
      <Center>
        <Box width="100%" maxWidth="1100px">
          <Input placeholder="请输入标题" size="lg" />
          <Editor />
        </Box>
      </Center>
    </>
  );
}
