import { useState, useEffect } from "react";

const useHackerNews = (loader, search) => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState();
  const [error, setError] = useState();
  const [page, setPage] = useState(0);
  const [maxPages, setMaxPages] = useState();

  const { REACT_APP_HN_API } = process.env;

  useEffect(() => {
    // console.log("fired; search is ", search);
    const fetchHN = () => {
      // Setting the query parameters manually (messy and prone to error):
      // `https://hn.algolia.com/api/v1/search_by_date?${search ? `query=${search}&` : ""}tags=story&hitsPerPage=30&page=${page}`

      // Setting the query parameters using the URL + URLSearchParams API (cleaner, escaped, safer, but more verbose)
      // https://developer.mozilla.org/en-US/docs/Web/API/URL_API
      // https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams
      // https://felixgerschau.com/js-manipulate-url-search-params/
      const url = new URL(`${REACT_APP_HN_API}/search_by_date`);

      const params = {
        tags: "story",
        hitsPerPage: 30,
      };
      if (page) params.page = page;
      if (search) {
        params.query = search.replace(/[^\w\d\s.]+/g, "").toLowerCase();
        params.restrictSearchableAttributes = "title";
      }

      url.search = new URLSearchParams(params);

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
          if (page === 0) {
            setNews(data.hits);
          } else {
            setNews((prevNews) => [...prevNews, ...data.hits]);
          }

          setMaxPages(data.nbPages);
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
          setError(error);
          console.log(error.message);
        });
    };
    fetchHN();

    const fetchInterval = setInterval(() => {
      fetchHN();
    }, 30000); // 30000 === 30s // 120000 == 120s

    return () => {
      clearInterval(fetchInterval);
    };
  }, [page, search, REACT_APP_HN_API]);

  useEffect(() => {
    if (!loading) {
      const loaderRef = loader?.current;

      const options = {
        root: null, // null will set it to have the window as root by default
        rootMargin: "0px",
        threshold: 1,
      };

      // Create the observer
      // https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
      const observer = new IntersectionObserver((entities) => {
        if (entities[0].isIntersecting) {
          if (page <= maxPages) {
            setPage((prevPage) => prevPage + 1);
          }
        }
      }, options);

      // Observe the loader
      if (loaderRef) {
        observer.observe(loaderRef);
      }

      // Clean up on Unmounting
      return () => observer.unobserve(loaderRef);
    }
  }, [loading, loader, page, maxPages]);

  return [error, loading, news, page, setPage];
};

export default useHackerNews;
