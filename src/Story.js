import React from 'react';
import arrow from "./img/grayarrow.gif"

const Story = ({ story: { author, created_at_i, objectID, created_at, points, title, url, num_comments }, index }) => {
    return ( 
        <div className="flex flex-col pl-2 text-sm">
            <div className="flex flex-row items-center">
                <span className="pr-1 text-hacker-dark">{++index}.</span>
                <img src={arrow} alt="upvote" style={{ width: '12px', height: "12px", marginBottom: "2px"}} />
                <p className="pl-1">{title}</p>
                <span className="text-hacker-dark text-xs pl-1">(brookings.edu)</span>
            </div>
            <div className="flex flex-row pl-8">
                <p className="text-hacker-dark text-xs">
                    {points} point{points > 1 && "s"} by <span>{author}</span>
                </p>
                <p className="text-hacker-dark text-xs pl-1">
                    <span>59 minutes ago</span> | <span>hide</span> | <span>{num_comments} comments</span>
                </p>
            </div>
        </div>
     );
}
 
export default Story;