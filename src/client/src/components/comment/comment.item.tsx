import { Avatar, ComponentWithAs, Flex, FlexProps, Text } from '@chakra-ui/react';
import { CommentData } from 'shared/interface/comment/comment.interface';
import CommentEditor from './comment-editor';

interface CommentItemProps extends FlexProps {
  comment: CommentData;
}

const CommentItem: ComponentWithAs<'div', CommentItemProps> = props => {
  const { comment, ...rest } = props;
  return (
    <Flex {...rest}>
      <Flex>
        <Avatar src={comment.user.avatar} width={6} height={6} />
        <Text flex={1}>{comment.content}</Text>
      </Flex>

      {/* <CommentEditor /> */}
    </Flex>
  );
};

export default CommentItem;
