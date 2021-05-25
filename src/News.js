import React, { useRef } from "react";
import Story from "./Story";
import useHackerNews from "./hooks/useHackerNews";
import { nanoid } from "nanoid";

const News = () => {
  // Create ref to attach to the loader component
  const loader = useRef(null);

  const [error, loading, news, setPage] = useHackerNews(loader);

  // console.log(news)
  return (
    <div className="w-full bg-hacker-light h-full pt-2">
      {news?.map((story, index) => {
        return <Story key={nanoid()} story={story} index={++index} />;
      })}
      {!loading && news && <h1 ref={loader}>Scroll down for more!</h1>}
      {/* <button onClick={() => setPage(1)}>dwmdlm</button> */}
    </div>
  );
};

export default News;
