import React from "react";
import { Link } from "react-router-dom";
import formatTime from "./utilities/formatTime";
import arrow from "./img/grayarrow.gif";
import { toast } from "react-toastify";
import "./css/overrides.css";

const Story = ({
  story: {
    author,
    created_at_i,
    objectID,
    id,
    created_at,
    points,
    title,
    url,
    num_comments,
  },
  index,
}) => {
  const getDomainFromUrl = (url) => {
    if (!url) return "No link provided";
    const a = document.createElement("a");
    a.setAttribute("href", url);
    const sanitizedUrl = a.hostname.replace(/www./g, "");
    return sanitizedUrl;
  };

  const handleUpvote = () => {
    toast.warn("💁 You must be logged in to upvote a story!", {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  return (
    <div className="flex flex-col px-1 md:pl-2 text-sm pt-1 text-center">
      <div className="flex flex-col md:flex-row items-center">
        <div className="flex flex-row items-center">
          {index && <span className="pr-1 text-hacker-dark">{index}.</span>}
          <img
            src={arrow}
            className="cursor-pointer"
            alt="upvote"
            style={{ width: "12px", height: "12px", marginBottom: "2px" }}
            onClick={handleUpvote}
          />
        </div>
        <a className="pl-1" href={url} target="_blank" rel="noreferrer">
          {title}
        </a>
        <span className="text-hacker-dark text-xs pl-1">
          ({getDomainFromUrl(url)})
        </span>
      </div>
      <div className={`flex flex-col md:flex-row md:pl-${index ? "8" : "4"}`}>
        <p className="text-hacker-dark text-xs">
          {points} point{points > 1 && "s"} by <span>{author}</span>
        </p>
        <p className="text-hacker-dark text-xs pl-1">
          <span>{formatTime(created_at)}</span> | <span>hide</span> |{" "}
          <span>
            <Link to={`/story/${objectID || id}`}>{num_comments} comments</Link>
          </span>
        </p>
      </div>
    </div>
  );
};

export default Story;
