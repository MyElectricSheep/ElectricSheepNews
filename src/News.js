import React, { useRef } from "react";
import Story from "./Story";
import useHackerNews from "./hooks/useHackerNews";
import BeatLoader from "react-spinners/BeatLoader";
import { nanoid } from "nanoid";

const News = () => {
  // Create ref to attach to the loader component
  const loader = useRef(null);

  const [error, loading, news] = useHackerNews(loader);

  const showLoader = loading && news.length < 30;

  console.log(news.length);
  return (
    <div
      className={`w-full bg-hacker-light ${
        showLoader
          ? "flex flex-col items-center justify-center h-screen"
          : "h-full"
      } pt-2`}
    >
      {showLoader ? (
        <BeatLoader color="black" loading={loading} size={20} />
      ) : (
        news?.map((story, index) => {
          return <Story key={nanoid()} story={story} index={++index} />;
        })
      )}
      {!loading && news && <h1 ref={loader}>Scroll down for more!</h1>}
    </div>
  );
};

export default News;
