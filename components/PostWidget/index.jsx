import moment from "moment";
import React, { useEffect, useState } from "react";
import { getRecentPosts, getSimilarPost } from "../../services";
import Link from "next/link";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
const PostWidget = ({ categories, slug }) => {
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    if (slug) {
      getSimilarPost(categories, slug).then((result) => {
        setRelatedPosts(result);
        setIsLoading(false);
      });
    } else {
      getRecentPosts().then((result) => {
        setRelatedPosts(result);
        setIsLoading(false);
      });
    }
  }, [slug]);

  return (
    <div className="p-8 mb-8 bg-white rounded-lg shadow-lg ">
      <h3 className="pb-4 mb-8 text-xl font-semibold border-b">
        {slug ? "Related Posts" : "Recent Posts"}
      </h3>
      {isLoading ? (
        <SkeletonTheme
          baseColor="#202020"
          highlightColor="#444"
          borderRadius={20}
          inline
        >
          <Skeleton height={72} width="100%" />
          <Skeleton height={72} width="100%" />
          <Skeleton height={72} width="100%" />
        </SkeletonTheme>
      ) : (
        <>
          {relatedPosts.map((post) => (
            <div key={post.title} className="flex items-center w-full mb-4">
              <div className="flex-none w-16">
                <img
                  src={post.featuredImage.url}
                  alt={post.title}
                  height="60px"
                  width="60px"
                  className="align-middle rounded-full"
                />
              </div>
              <div className="flex-grow ml-4">
                <p className="text-gray-500 font-xs">
                  {moment(post.createdAt).format("MMMM DD, YYYY")}
                </p>
                <Link
                  key={post.title}
                  href={`/post/${post.slug}`}
                  className="text-md"
                >
                  {post.title}
                </Link>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default PostWidget;
