import React from 'react'
import {
    useParams
  } from "react-router-dom";
import useHackerComments from "./hooks/useHackerComments"
import Story from "./Story"

const StoryWithComments = () => {
    // http://hn.algolia.com/api/v1/items/:id
    const { id } = useParams();
    const [error, loading, storyWithComments] = useHackerComments(id)
    console.log(storyWithComments)
    return ( 
        <div className="w-full bg-hacker-light h-full pt-2">
            <Story story={storyWithComments}/>
            <div className="pl-6 pt-5 pr-6 md:pr-0">
                <form className="flex flex-col md:w-2/3 lg:w-1/3 sm:w-full items-start">
                    <textarea className="border-black border" cols="75" rows="8"></textarea>
                    <button className="mt-4 bg-gradient-to-b from-gray-100 to-gray-200 border border-gray-500 p-0.5 pr-1 pl-1 font-normal text-sm">add comment</button>
                </form>
            </div>
        </div>
     );
}
 
export default StoryWithComments;