import { ComponentWithAs, Flex, FlexProps } from '@chakra-ui/react';
import { CommentData } from 'shared/interface/comment/comment.interface';
import CommentItem from './comment.item';

interface CommentListProps extends FlexProps {
  comments: CommentData[];
  onSubmit: () => void;
}

const CommentList: ComponentWithAs<'div', CommentListProps> = props => {
  const { comments, onSubmit, ...rest } = props;
  return (
    <Flex {...rest}>
      {comments.map(comment => (
        <CommentItem onSubmit={onSubmit} width="100%" key={comment.id} comment={comment} />
      ))}
    </Flex>
  );
};

export default CommentList;
