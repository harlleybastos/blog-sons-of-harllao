import React, { useState, useEffect } from "react";
import { getComments } from "../../services";
import moment from "moment";
import parse from "html-react-parser";
import { StarRating } from "../StarsRatting";

const Comments = ({ slug }) => {
  const [comments, setComments] = useState([]);
  useEffect(() => {
    getComments(slug).then((result) => setComments(result));
  }, []);

  return (
    <>
      {comments.length > 0 && (
        <div className="p-8 bg-white rounded-lg shadow-lg pb-12-mb-8">
          <h3 className="pb-4 mb-8 text-xl font-semibold border-b">
            {comments.length} Comments
          </h3>
          {comments.map((comment) => (
            <div
              key={comment.createdAt}
              className="pb-4 mb-4 border-b border-gray-100"
            >
              <p className="mb-4 ">
                <span className="font-semibold">{comment.name}</span> on{" "}
                {moment(comment.createdAt).format("MMM DD, YYYY")}
              </p>
              <div className="flex">
                <p className="w-full text-gray-600 whitespace-pre-line">
                  {parse(comment.comment)}
                </p>
                {comment.userHasRated && (
                  <StarRating numberOfStars={comment.numberOfStars} />
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default Comments;
