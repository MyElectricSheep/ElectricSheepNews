import { useState, useEffect } from 'react';

const useHackerNews = (id) => {
    const [storyWithComments, setStoryWithComments] = useState([])
    const [loading, setLoading] = useState()
    const [error, setError] = useState()

    useEffect(() => {
        setLoading(true)
        fetch(`http://hn.algolia.com/api/v1/items/${id}`)
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
              setStoryWithComments(data)
              setLoading(false)
            })
          .catch((error) => {
             setLoading(false)
              setError(error)
              console.log(error.message)
            });
      }, [id]);
      
    
    return [error, loading, storyWithComments]
}
 
export default useHackerNews;