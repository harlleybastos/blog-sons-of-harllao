import React from "react";
import { getPosts, getPostsDetails } from "../../services";

import PostDetail from "../../components/PostDetail";
import PostWidget from "../../components/PostWidget";
import Categories from "../../components/Categories";
import CommentsForm from "../../components/CommentsForm";
import Comments from "../../components/Comments";
import Author from "../../components/Author";

const PostDetails = () => {
  return (
    <div className="container px-10 mx-auto mb-8 ">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
        <div className="col-span-1 lg:col-span-8">
          <PostDetail />
          <Author />
          <CommentsForm />
          <Comments />
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
};

export default PostDetails;
