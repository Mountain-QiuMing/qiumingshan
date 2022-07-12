import { Box } from '@chakra-ui/react';
import { FC, useEffect, useState } from 'react';
import { CommentData } from 'shared/interface/comment/comment.interface';
import { apiGetPostComment } from '../../api/comment/post.api';
import CommentEditor from './comment-editor';
import CommentList from './comment-list';

interface CommentProps {
  postId: string;
}

const Comment: FC<CommentProps> = ({ postId }) => {
  const [comments, setComments] = useState<CommentData[]>([]);
  const [commentEditorVisible, setCommentEditorVisible] = useState(false);

  const getData = async () => {
    const res = await apiGetPostComment(postId);
    if (res.status) {
      setComments(res.result);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Box>
      <CommentEditor
        visible={commentEditorVisible}
        onVisibleChange={setCommentEditorVisible}
        postId={postId}
        onSubmit={getData}
        mb={10}
      />
      <CommentList comments={comments} onSubmit={getData} />
    </Box>
  );
};

export default Comment;
