import React from "react";
import { Link } from "react-router-dom";
import formatTime from "./utilities/formatTime";
import arrow from "./img/grayarrow.gif";

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

  return (
    <div className="flex flex-col pl-2 text-sm pt-1">
      <div className="flex flex-row items-center">
        {index && <span className="pr-1 text-hacker-dark">{index}.</span>}
        <img
          src={arrow}
          alt="upvote"
          style={{ width: "12px", height: "12px", marginBottom: "2px" }}
        />
        <a className="pl-1" href={url} target="_blank" rel="noreferrer">
          {title}
        </a>
        <span className="text-hacker-dark text-xs pl-1">
          ({getDomainFromUrl(url)})
        </span>
      </div>
      <div className={`flex flex-row pl-${index ? "8" : "4"}`}>
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
