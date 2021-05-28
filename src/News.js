import React, { useRef, useEffect } from "react";
import Story from "./Story";
import useHackerNews from "./hooks/useHackerNews";
import BeatLoader from "react-spinners/BeatLoader";
import { nanoid } from "nanoid";

const News = ({ search, setSearch }) => {
  // Create ref to attach to the loader component
  const loader = useRef(null);

  const [error, loading, news, setPage] = useHackerNews(loader, search);

  useEffect(() => {
    setPage(0);
  }, [search, setPage]);

  const showLoader = loading && news.length < 30;

  //   console.log(news.length);
  return (
    <div
      className={`w-full bg-hacker-light ${
        showLoader
          ? "flex flex-col items-center justify-center h-screen"
          : "h-full"
      }`}
    >
      {showLoader ? (
        <BeatLoader color="black" loading={loading} size={20} />
      ) : (
        <div className="flex flex-col pt-1">
          {search && (
            <div className="flex flex-row self-end pr-5">
              <p className=" pt-1 pb-1">
                You are currently seeing news about:{" "}
                <span className="font-bold">{search}</span>
              </p>
              <span
                role="img"
                aria-label="Delete filter"
                className="transition-opacity duration-300 text-xxs cursor-pointer self-center pl-1 pt-1 opacity-50 hover:opacity-100"
                onClick={() => setSearch("")}
              >
                ❌
              </span>
            </div>
          )}
          {news?.map((story, index) => {
            return <Story key={nanoid()} story={story} index={++index} />;
          })}
        </div>
      )}
      {!loading && news && <h1 ref={loader}>Scroll down for more!</h1>}
    </div>
  );
};

export default News;
