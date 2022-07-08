import { Avatar, Box, ComponentWithAs, Flex, Heading, Icon, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { PostItem as Post } from 'shared/interface/post/post.interface';
import { HeartLineIcon, Message3LineIcon, ShareForwardLineIcon, StarLineIcon } from 'ultra-icon';
import dateUtil from '../utils/date';

interface PostItemProps {
  post: Post;
}

const PostItem: ComponentWithAs<'div', PostItemProps> = props => {
  const { post } = props;
  const { user } = post;

  const router = useRouter();

  const handlePostDetail = () => {
    router.push(`/p/${props.id}`);
  };
  return (
    <Box>
      <Flex alignItems="center" justifyContent="space-between">
        <Box alignItems="center">
          <Avatar src={user.avatar} width={6} height={6} mr={2} />
          <Text fontSize="larger" as="span">
            {user.nickname || user.username}
          </Text>
        </Box>
        <Text fontSize="sm">{dateUtil().to(dateUtil(post.updated))}</Text>
      </Flex>
      <Heading fontSize="xl" my={4} onClick={handlePostDetail} overflow="hidden" textOverflow="ellipsis">
        {post.title}
      </Heading>
      <Flex gap={10} justifyContent="space-between">
        <Flex alignItems="center">
          <Icon as={StarLineIcon} mr={1} /> 10 赞
        </Flex>
        <Flex alignItems="center">
          <Icon as={Message3LineIcon} mr={1} />
          100 评论
        </Flex>
        <Flex alignItems="center">
          <Icon as={HeartLineIcon} mr={1} />
          收藏
        </Flex>
        <Flex alignItems="center">
          <Icon as={ShareForwardLineIcon} mr={1} />
          转发
        </Flex>
      </Flex>
    </Box>
  );
};

export default PostItem;
