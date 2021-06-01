import { useState, useEffect } from "react";

const { REACT_APP_HN_API } = process.env;

const useHackerNews = (id) => {
  const [storyWithComments, setStoryWithComments] = useState([]);
  const [loading, setLoading] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    const url = new URL(`${REACT_APP_HN_API}/items/${id}`);
    setLoading(true);
    fetch(url)
      .then(
        (res) => {
          if (!res.ok) throw new Error(res.error);
          return res.json();
        },
        (error) => {
          setLoading(false);
          setError(error);
          console.log(error.message);
        }
      )
      .then((data) => {
        setStoryWithComments(data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        setError(error);
        console.log(error.message);
      });
  }, [id]);

  return [error, loading, storyWithComments];
};

export default useHackerNews;
