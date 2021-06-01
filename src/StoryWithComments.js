import React from "react";
import { useParams } from "react-router-dom";
import Collapsible from "react-collapsible";
import parse from "html-react-parser";
import BeatLoader from "react-spinners/BeatLoader";
import useHackerComments from "./hooks/useHackerComments";
import Story from "./Story";
import toaster from "./utilities/toaster";

import formatTime from "./utilities/formatTime";

import arrow from "./img/grayarrow.gif";

const Comment = ({ author, created_at }) => {
  return (
    <div className="flex flex-col text-sm pt-1">
      <div className="flex flex-row items-center">
        <img
          src={arrow}
          alt="upvote"
          style={{ width: "12px", height: "12px", marginBottom: "2px" }}
        />
        <p className="pl-1 text-hacker-dark text-xs">{author || "anonymous"}</p>
        <p className="pl-1 text-hacker-dark text-xs">
          {formatTime(created_at)}
        </p>
        <p className="pl-1 text-hacker-dark text-xs cursor-pointer">[-]</p>
      </div>
    </div>
  );
};

const CollapsibleComment = ({
  author,
  children,
  created_at,
  id,
  text,
  onReply,
}) => {
  if (!text) return null;
  return (
    <Collapsible
      open
      trigger={<Comment author={author} created_at={created_at} />}
    >
      <div className="pb-3">
        <div className="ml-6 text-xs pt-0.5">{parse(text)}</div>
        <span
          className="ml-6 text-hacker-dark text-xxs border-b border-dashed border-hacker-dark w-auto cursor-pointer"
          onClick={onReply}
        >
          reply
        </span>
      </div>
    </Collapsible>
  );
};

// author: "grouphugs"
// children: []
// created_at: "2021-05-25T16:25:31.000Z"
// created_at_i: 1621959931
// id: 27278857
// options: []
// parent_id: 27276706
// points: null
// story_id: 27276706
// text: "<p>it&#x27;s probably time to stop recommending alt-right and fascist products, but you&#x27;re all literally nazis, and you&#x27;re going to die like ones</p>"
// title: null
// type: "comment"
// url: null

const getCommentsWithChildren = (comment) => {
  // if(!children)
  if (comment.children && comment.children.length) {
    comment.children.map((comment) => {
      return getCommentsWithChildren(comment);
    });
  }
  return <CollapsibleComment key={comment.id} {...comment} />;
};

const StoryWithComments = () => {
  // http://hn.algolia.com/api/v1/items/:id
  const { id } = useParams();
  const [error, loading, storyWithComments] = useHackerComments(id);
  console.log(storyWithComments);

  const setScreenHeight = () => {
    if (!storyWithComments?.children?.length || loading) return "h-screen";
    return "h-full";
  };

  const handleSubmitComment = (e) => {
    e.preventDefault();
    toaster("💁 You must be logged in to add a comment!");
    setTimeout(() => e.target.reset(), 2000);
  };

  const handleReplyToComment = () => {
    toaster("💁 You must be logged in to reply to a comment!");
  };

  return (
    <div
      className={`w-full bg-hacker-light ${
        loading ? "flex flex-col items-center justify-center" : ""
      } ${setScreenHeight()} pt-2`}
    >
      {loading ? (
        <BeatLoader color="black" loading={loading} size={20} />
      ) : (
        <>
          <Story story={storyWithComments} withComments={true} />
          {/* Write a comment section */}
          <div className="ml-6 pt-5 pr-6 md:pr-0">
            <form
              className="flex flex-col md:w-2/3 lg:w-1/3 sm:w-full items-start"
              onSubmit={handleSubmitComment}
            >
              <textarea
                className="border-black border"
                cols="75"
                rows="8"
              ></textarea>
              <button className="mt-4 bg-gradient-to-b from-gray-100 to-gray-200 border border-gray-500 p-0.5 pr-1 pl-1 font-normal text-sm">
                add comment
              </button>
            </form>
          </div>
          {/* Comments section */}
          <div className="pt-6 pr-3 pl-3">
            {storyWithComments?.children?.length ? (
              storyWithComments.children.map((comment) => {
                return (
                  <CollapsibleComment
                    key={comment.id}
                    onReply={handleReplyToComment}
                    {...comment}
                  />
                );
              })
            ) : (
              <p className="pl-3 text-sm">
                This story does not have comments yet
              </p>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default StoryWithComments;

// getCommentsWithChildren(storyWithComments)
