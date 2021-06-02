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

const randomColor = () =>
  `#${Math.floor(Math.random() * 16777215).toString(16)}`;

const Comment = ({ author, created_at, child, onUpvote }) => {
  return (
    <div className={`flex flex-col text-sm pt-1 ${child && "pl-4"}`}>
      <div className="flex flex-col sm:flex-row items-center">
        <div className="flex flex-row">
          <img
            src={arrow}
            alt="upvote"
            style={{ width: "12px", height: "12px", marginBottom: "2px" }}
            className="cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              onUpvote();
            }}
          />
          <p className="pl-1 text-hacker-dark text-xs">
            {author || "anonymous"}
          </p>
        </div>
        <div className="flex flex-row">
          <p className="pl-1 text-hacker-dark text-xs">
            {formatTime(created_at)}
          </p>
          <p className="pl-1 text-hacker-dark text-xs cursor-pointer">[-]</p>
        </div>
      </div>
    </div>
  );
};

const CollapsibleComment = ({
  author,
  children,
  created_at,
  text,
  onReply,
  child,
  onUpvote,
}) => {
  if (!text) return null;
  const hasChildren = children && children.length >= 1;
  return (
    <Collapsible
      open
      trigger={
        <Comment
          author={author}
          created_at={created_at}
          child={child}
          onUpvote={onUpvote}
        />
      }
    >
      <div>
        <div className="ml-6 text-xs pt-0.5">{parse(text)}</div>
        <span
          className="ml-6 text-hacker-dark text-xxs border-b border-dashed border-hacker-dark w-auto cursor-pointer"
          onClick={onReply}
        >
          reply
        </span>
        <div className="pl-4">
          {hasChildren &&
            children.map((c) => {
              return (
                <CollapsibleComment
                  key={c.id}
                  {...c}
                  child
                  onUpvote={onUpvote}
                  onReply={onReply}
                />
              );
            })}
        </div>
      </div>
    </Collapsible>
  );
};

const StoryWithComments = () => {
  const { id } = useParams();
  const [error, loading, storyWithComments] = useHackerComments(id);
  console.log(storyWithComments);

  const setScreenHeight = () => {
    if (!storyWithComments?.children?.length || loading) return "h-screen";
    return "h-full";
  };

  const handleUpvote = () => {
    toaster("💁 You must be logged in to upvote a comment!");
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
          <div className="ml-3 pt-5 mr-3 md:ml-6 md:mr-0">
            <form
              className="flex flex-col w-full sm:w-full md:w-2/3 lg:w-1/3 md:items-start items-center"
              onSubmit={handleSubmitComment}
            >
              <textarea
                className="border-black border w-full"
                // cols="75"
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
                  <div
                    className="pl-2 mb-3 border-l-2"
                    style={{ borderColor: randomColor() }}
                  >
                    <CollapsibleComment
                      key={comment.id}
                      onReply={handleReplyToComment}
                      onUpvote={handleUpvote}
                      {...comment}
                    />
                  </div>
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
