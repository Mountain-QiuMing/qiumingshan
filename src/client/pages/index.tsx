import { GetStaticProps } from 'next';
import { request } from '../api';
import Layout from '../components/Layout';

const IndexPage = props => {
  return (
    <Layout title="Home | Next.js + TypeScript Example">
      <h1>Posts</h1>
      <ul>
        {props.posts.map((post, index) => (
          <li key={index}>
            <h3>{post.title}</h3>
            <p>{post.content}</p>
          </li>
        ))}
      </ul>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const res: any = await request('get', '/post');
  return { props: { posts: res.posts } };
};

export default IndexPage;
