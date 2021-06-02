import React, { useRef, useEffect } from "react";
import Story from "./Story";
import useHackerNews from "./hooks/useHackerNews";
import SearchFilter from "./SearchFilter";
import RefreshCounter from "./RefreshCounter";
import BeatLoader from "react-spinners/BeatLoader";
import { nanoid } from "nanoid";

const News = ({ search, setSearch, hidden, setHidden }) => {
  // Create ref to attach to the loader component
  const loader = useRef(null);

  const [error, loading, news, page, setPage] = useHackerNews(loader, search);

  useEffect(() => {
    if (search) setPage(0);
  }, [search, setPage]);

  const showLoader = loading && news.length < 30;
  const isNews = news.length;

  // console.log(news.length);
  return (
    <div
      className={`relative w-full bg-hacker-light ${
        showLoader
          ? "flex flex-col items-center justify-center h-screen"
          : "h-full"
      } ${!isNews && "flex flex-col items-center justify-center h-screen"}`}
    >
      {showLoader ? (
        <BeatLoader color="black" loading={loading} size={20} />
      ) : (
        <div className="flex flex-col pt-1">
          {/* <RefreshCounter /> */}
          {search && (
            <SearchFilter
              search={search}
              setSearch={setSearch}
              setPage={setPage}
              page={page}
              isNews={isNews}
            />
          )}
          {news
            ?.filter((story) => !hidden.includes(story.objectID))
            .map((story, index) => {
              return (
                <Story
                  key={nanoid()}
                  story={story}
                  index={++index}
                  setHidden={setHidden}
                />
              );
            })}
        </div>
      )}
      {!loading && news && (
        <h1 ref={loader} className={!isNews ? "hidden" : ""}>
          Scroll down for more!
        </h1>
      )}
    </div>
  );
};

export default News;
