import React from "react";
import { Link } from "react-router-dom";
import formatTime from "./utilities/formatTime";
import arrow from "./img/grayarrow.gif";
import { toast } from "react-toastify";
import "./css/overrides.css";

const CustomLink = ({ url, urlDomain }) => {
  if (!url) {
    return <span className="text-hacker-dark text-xs pl-1">({urlDomain})</span>;
  }
  return (
    <a
      className="text-hacker-dark text-xs pl-1 hover:underline cursor-pointer"
      href={`http://${urlDomain}`}
      target="_blank"
      rel="noreferrer"
    >
      ({urlDomain})
    </a>
  );
};

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
  setHidden,
  withComments,
}) => {
  const getDomainFromUrl = (url) => {
    // https://stackoverflow.com/questions/6941533/get-protocol-domain-and-port-from-url
    if (!url) return "No link provided";
    const domain = new URL(url).hostname;
    const sanitizedDomain = domain.replace(/www./g, "");

    // For IE11 support:
    // const a = document.createElement("a");
    // a.setAttribute("href", url);
    // const sanitizedUrl = a.hostname.replace(/www./g, "");
    return sanitizedDomain;
  };

  const urlDomain = getDomainFromUrl(url);

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

  const handleHide = () => {
    setHidden((prevHidden) => [...prevHidden, objectID]);
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
        <CustomLink url={url} urlDomain={urlDomain} />
      </div>
      <div className={`flex flex-col md:flex-row md:pl-${index ? "8" : "4"}`}>
        <p className="text-hacker-dark text-xs">
          {points} point{points > 1 && "s"} by{" "}
          <span className="underline">{author}</span>
        </p>
        <p className="text-hacker-dark text-xs pl-1">
          <span>{formatTime(created_at)}</span> |{" "}
          {!withComments && (
            <>
              <span className="cursor-pointer" onClick={handleHide}>
                hide
              </span>{" "}
              |{" "}
            </>
          )}
          <span>
            <Link to={`/story/${objectID || id}`}>{num_comments} comments</Link>
          </span>
        </p>
      </div>
    </div>
  );
};

export default Story;
