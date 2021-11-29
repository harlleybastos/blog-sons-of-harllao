import Head from "next/head";
import Categories from "../components/Categories";
import PostCard from "../components/PostCard";
import PostWidget from "../components/PostWidget";
import { getPosts } from '../services';


export default function Home({
  posts
}) {
  console.log(posts)

  return (
    <div className="container px-10 mx-auto mb-8">
      <Head>
        <title>Sons of Harllão Blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
        <div className="col-span-1 lg:col-span-8">
          {posts || []?.map((post, index) => (
            <PostCard post={post} key={post.title} />
          ))}
        </div>
      </div>
      <div className="col-span-1 lg:col-span-4">
        <div className="relative lg:sticky top-8">
          <PostWidget />
          <Categories />
        </div>
      </div>
    </div>
  );
}


export async function getStaticPosts() {
  const posts = await getPosts()
  console.log(posts);
  return {
    props: { posts }
  }
}
