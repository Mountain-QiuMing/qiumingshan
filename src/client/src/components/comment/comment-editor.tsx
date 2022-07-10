import { Avatar, ComponentWithAs, Flex, Textarea, TextareaProps } from '@chakra-ui/react';
import { useStore } from '../../store';

interface CommentEditorProps extends TextareaProps {}

const CommentEditor: ComponentWithAs<'textarea', CommentEditorProps> = () => {
  const { avatar } = useStore();
  return (
    <Flex>
      <Avatar src={avatar} width={6} height={6} mt={2} />
      <Textarea placeholder="输入评论" resize="vertical" ml={2} />
    </Flex>
  );
};

export default CommentEditor;
