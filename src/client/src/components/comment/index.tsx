import { Box } from '@chakra-ui/react';
import { NextComponentType } from 'next';
import CommentEditor from './comment-editor';
import CommentList from './comment-list';

const Comment: NextComponentType = () => {
  return (
    <Box>
      <CommentEditor />
      <CommentList comments={[]} />
    </Box>
  );
};

export default Comment;
