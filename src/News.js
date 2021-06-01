import React, { useRef, useEffect, useState } from "react";
import Story from "./Story";
import useHackerNews from "./hooks/useHackerNews";
import BeatLoader from "react-spinners/BeatLoader";
import { nanoid } from "nanoid";

const News = ({ search, setSearch, hidden, setHidden }) => {
  // Create ref to attach to the loader component
  const loader = useRef(null);

  const [error, loading, news, page] = useHackerNews(loader, search);

  const [counter, setCounter] = useState(10);
  const timer = useRef(undefined);

  const handleResetTimer = () => {
    clearInterval(timer.current);
    timer.current = undefined;
    setCounter(30);
  };

  useEffect(() => {
    handleResetTimer();
  }, [page, search]);

  useEffect(() => {
    if (!timer.current) {
      timer.current = setInterval(
        () => setCounter((prevCounter) => prevCounter - 1),
        1000
      );
    } else if (counter === 0 && timer.current) {
      handleResetTimer();
    }
  }, [counter]);

  const showLoader = loading && news.length < 30;

  //   console.log(news.length);
  return (
    <div
      className={`relative w-full bg-hacker-light ${
        showLoader
          ? "flex flex-col items-center justify-center h-screen"
          : "h-full"
      }`}
    >
      {showLoader ? (
        <BeatLoader color="black" loading={loading} size={20} />
      ) : (
        <div className="flex flex-col pt-1">
          <div className="fixed bottom-0 right-8 sm:right-16 md:right-32 xl:right-1/2 opacity-30 text-hacker-dark text-sm">
            Next update in: {counter}s
          </div>
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
      {!loading && news && <h1 ref={loader}>Scroll down for more!</h1>}
    </div>
  );
};

export default News;
