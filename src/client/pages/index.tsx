import axios from 'axios'
import { GetStaticProps } from 'next'
import Layout from '../components/Layout'

const IndexPage = (props) => {
  return (
    <Layout title="Home | Next.js + TypeScript Example">
      <h1>Posts</h1>
      <ul>
        {
          props.posts.map((post, index) => (<li key={index}>
              <h3>{post.title}</h3>
              <p>{post.content}</p>
            </li>))
        }
      </ul>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const post = await axios.get('http://localhost:3002/post')
  return { props: { posts: post.data.posts } }
}

export default IndexPage
