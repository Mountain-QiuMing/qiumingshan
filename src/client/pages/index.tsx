import { GetServerSideProps } from 'next';
import Layout from '@/components/layout';
import { apiGetPostList } from '@/api/post/publish-post';
import { Heading } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { Post } from 'shared/interface/post/post.interface';

const IndexPage = props => {
  const router = useRouter();

  const handlePostDetail = (post: Post) => {
    router.push(`/p/${post.id}`);
  };
  return (
    <Layout title="Home | Next.js + TypeScript Example">
      <Heading>文章列表</Heading>
      <ul>
        {props.posts.data?.map((post, index) => (
          <li key={index} onClick={() => handlePostDetail(post)}>
            <h3>{post.title}</h3>
          </li>
        ))}
      </ul>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await apiGetPostList();
  return { props: { posts: res.result || [] } };
};

export default IndexPage;
