import Head from "next/head";
import Categories from "../components/Categories";
import PostCard from "../components/PostCard";
import PostWidget from "../components/PostWidget";
import FeaturedPosts from "../sections/FeaturedPosts";
import { getPosts } from "../services";

export default function Home({ posts }) {
  return (
    <div className="container px-10 mx-auto mb-8">
      <Head>
        <title>Sons of Harllão Blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <FeaturedPosts />
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
        <div className="col-span-1 lg:col-span-8">
          {posts.length < 1 ? (
            <SkeletonTheme
              baseColor="#202020"
              highlightColor="#444"
              height={288}
              borderRadius={20}
            >
              <Skeleton width={320} height={720} />
              <Skeleton width={714} height={37} />
              <Skeleton width={720} height={30} />
              <Skeleton width={720} height={224} />
              <Skeleton width={720} height={52} />
            </SkeletonTheme>
          ) : (
            posts.map((post, index) => (
              <PostCard post={post.node} key={index} />
            ))
          )}
          {}
        </div>
        <div className="col-span-1 lg:col-span-4">
          <div className="relative lg:sticky top-8">
            <PostWidget />
            <Categories />
          </div>
        </div>
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const posts = await getPosts();
  return {
    props: { posts },
  };
}
