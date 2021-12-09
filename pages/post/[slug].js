import React, { useEffect } from "react";
import { getPosts, getPostDetails } from "../../services";

import { useRouter } from "next/router";
import PostDetail from "../../components/PostDetail";
import PostWidget from "../../components/PostWidget";
import Categories from "../../components/Categories";
import CommentsForm from "../../components/CommentsForm";
import Comments from "../../components/Comments";
import Author from "../../components/Author";
import Loader from "../../components/Loader";

const PostDetails = ({ post }) => {
  const router = useRouter();

  if (router.isFallback) {
    return <Loader />;
  }
  return (
    <div className="container px-10 mx-auto mb-8 ">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
        <div className="col-span-1 lg:col-span-8">
          <PostDetail post={post} />
          <Author author={post.author} />
          <CommentsForm slug={post.slug} />
          <Comments slug={post.slug} />
        </div>
        <div className="col-span-1 lg:col-span-4">
          <div className="relative lg:sticky top-8">
            <PostWidget
              slug={post.slug}
              categories={post.categories.map((category) => category.slug)}
            />
            <Categories />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetails;

export async function getStaticProps(context) {
  const data = await getPostDetails(context.params.slug);

  return {
    props: { post: data },
  };
}

export async function getStaticPaths() {
  const posts = await getPosts();

  return {
    paths: posts.map(({ node: { slug } }) => ({ params: { slug } })),
    fallback: true,
  };
}
