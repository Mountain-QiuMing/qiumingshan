import { Avatar, Box, ComponentWithAs, Flex, FlexProps, Icon, Text } from '@chakra-ui/react';
import { useState } from 'react';
import { CommentData } from 'shared/interface/comment/comment.interface';
import { Message3LineIcon, StarLineIcon } from 'ultra-icon';
import dateUtil from '../../utils/date';
import CommentEditor from './comment-editor';
import CommentList from './comment-list';

interface CommentItemProps extends FlexProps {
  comment: CommentData;
  onSubmit: () => void;
}

const CommentItem: ComponentWithAs<'div', CommentItemProps> = props => {
  const { comment, onSubmit, ...rest } = props;
  const [commentEditorVisible, setCommentEditorVisible] = useState(false);

  return (
    <Flex {...rest}>
      <Avatar src={comment.user.avatar} width={6} height={6} mr={2} />
      <Flex flex={1} flexDir="column">
        <Box flex={1} borderWidth="1px" borderRadius={2} px={4} py={1}>
          <Text fontWeight="bold">
            {comment.user.nickname || comment.user.username}
            <Text ml={4} as="span" color="gray.400" fontSize="sm">
              {dateUtil().to(comment.createdAt)}
            </Text>
          </Text>
          <Text my={1}>{comment.content}</Text>
        </Box>
        <Flex gap={10} fontSize="sm" pl={4} mt={1.5}>
          <Flex alignItems="center" cursor="pointer">
            <Icon as={StarLineIcon} mr={1} /> 10 赞
          </Flex>
          <Flex alignItems="center" cursor="pointer" onClick={() => setCommentEditorVisible(true)}>
            <Icon as={Message3LineIcon} mr={1} />
            100 评论
          </Flex>
        </Flex>

        {commentEditorVisible && (
          <CommentEditor
            postId={comment.postId}
            visible={commentEditorVisible}
            onVisibleChange={setCommentEditorVisible}
            onSubmit={onSubmit}
          />
        )}
        {comment.children?.length && <CommentList comments={comment.children} onSubmit={onSubmit} />}
      </Flex>
    </Flex>
  );
};

export default CommentItem;
