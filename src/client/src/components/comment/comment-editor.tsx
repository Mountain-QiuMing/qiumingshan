import { Avatar, Box, Button, ComponentWithAs, Flex, Textarea, TextareaProps } from '@chakra-ui/react';
import { useState } from 'react';
import { apiAddPostComment } from '../../api/comment/post.api';
import { useStore } from '../../store';
import { toast } from '../../utils/toast';

interface CommentEditorProps extends TextareaProps {
  commentId?: string;
  postId: string;
  onSubmit: () => void;
  visible: boolean;
  onVisibleChange: (visible: boolean) => void;
}

const CommentEditor: ComponentWithAs<'textarea', CommentEditorProps> = props => {
  const { postId, commentId, onSubmit, visible, onVisibleChange, ...rest } = props;
  const { avatar } = useStore();
  const [content, setContent] = useState('');

  const handleSubmit = async () => {
    if (!content) {
      return toast.warning('内容不能为空');
    }

    const res = await apiAddPostComment({
      postId,
      commentId,
      content,
    });

    if (res.status) {
      setContent('');
      onVisibleChange(false);
      onSubmit();
    }
  };
  return (
    <Flex mt={4}>
      <Avatar src={avatar} width={6} height={6} mt={2} />
      <Box flex={1}>
        <Textarea
          value={content}
          onChange={e => setContent(e.target.value)}
          placeholder="输入评论"
          resize="vertical"
          ml={2}
          boxSizing="border-box"
          onFocus={() => onVisibleChange(true)}
          {...rest}
        />

        {visible && (
          <Flex alignItems="center" mt={4}>
            <Button colorScheme="primary" mr={4} onClick={handleSubmit}>
              提交
            </Button>
            <Button onClick={() => onVisibleChange(false)}>取消</Button>
          </Flex>
        )}
      </Box>
    </Flex>
  );
};

export default CommentEditor;
