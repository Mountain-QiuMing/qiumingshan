import { ComponentWithAs, Flex, FlexProps } from '@chakra-ui/react';
import { CommentData } from 'shared/interface/comment/comment.interface';
import CommentItem from './comment.item';

interface CommentListProps extends FlexProps {
  comments: CommentData[];
}

const CommentList: ComponentWithAs<'div', CommentListProps> = props => {
  const { comments, ...rest } = props;
  return (
    <Flex {...rest}>
      {comments.map(comment => (
        <CommentItem comment={comment} />
      ))}
    </Flex>
  );
};

export default CommentList;
