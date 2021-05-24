import { useState, useEffect } from 'react';

const useHackerNews = (loader) => {
    const [news, setNews] = useState([])
    const [loading, setLoading] = useState()
    const [error, setError] = useState()
    const [page, setPage] = useState(0)
    const [maxPages, setMaxPages] = useState()

    useEffect(() => {
        setLoading(true)
        fetch(`https://hn.algolia.com/api/v1/search_by_date?tags=story&hitsPerPage=30&page=${page}`)
          .then(
            (res) => {
              if (!res.ok) throw new Error(res.error);
              return res.json();
            },
            (error) =>{ 
                setLoading(false)
                setError(error)
                console.log(error.message)
            }
          )
          .then((data) => {
              setNews(prevNews => [...prevNews, ...data.hits])
              setMaxPages(data.nbPages)
              setLoading(false)
            })
          .catch((error) => {
             setLoading(false)
              setError(error)
              console.log(error.message)
            });
      }, [page]);

      useEffect(() => {
        if (!loading) {
          const loaderRef = loader?.current
  
          const options = {
              root: null, // null will set it to have the window as root by default
              rootMargin: '0px',
              threshold: 1
          };

          // Create the observer
          // https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
          const observer = new IntersectionObserver((entities) => {

            if (entities[0].isIntersecting) {
              if (page <= maxPages) {
                setPage(prevPage => prevPage + 1)
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
      
    
    return [error, loading, news, setPage]
}
 
export default useHackerNews;