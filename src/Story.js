import React from 'react';
import { differenceInMinutes, differenceInHours, differenceInCalendarDays, parseISO} from 'date-fns'
import { Link } from "react-router-dom";
  
import arrow from "./img/grayarrow.gif"

const Story = ({ story: { author, created_at_i, objectID, id, created_at, points, title, url, num_comments }, index }) => {

    const getDomainFromUrl = (url) => {
        if (!url) return "No link provided"
        const a = document.createElement('a')
        a.setAttribute('href', url);
        const sanitizedUrl = a.hostname.replace(/www./g, "")
        return sanitizedUrl;
    }

    const formatTime = () => {
        // https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#string-arguments
        // https://date-fns.org/v2.21.3/docs/differenceInMinutes
        const timeDifferenceInMinutes = differenceInMinutes(Date.now(), parseISO(created_at, 1))
        const timeDifferenceInHours = differenceInHours(Date.now(), parseISO(created_at, 1))
        const timeDifferenceInDays = differenceInCalendarDays(Date.now(), parseISO(created_at, 1))

        const pluralMinutes = timeDifferenceInMinutes > 1 ? "s" : ""
        const pluralHours = timeDifferenceInHours > 1 ? "s" : ""
        const pluralDays = timeDifferenceInDays > 1 ? "s" : ""

        if (timeDifferenceInDays >= 1) return `${timeDifferenceInDays} day${pluralDays} ago`
        if (timeDifferenceInHours >= 1) return `${timeDifferenceInHours} hour${pluralHours} and ${timeDifferenceInMinutes - (60 * timeDifferenceInHours)} minute${pluralMinutes} ago`
        if (timeDifferenceInMinutes < 60) return `${timeDifferenceInMinutes} minute${pluralMinutes} ago`
        return "Some time ago"
    }

    return ( 
        <div className="flex flex-col pl-2 text-sm pt-1">
            <div className="flex flex-row items-center">
                {index && <span className="pr-1 text-hacker-dark">{index}.</span>}
                <img src={arrow} alt="upvote" style={{ width: '12px', height: "12px", marginBottom: "2px"}} />
                <a className="pl-1" href={url} target="_blank" rel="noreferrer">{title}</a>
                <span className="text-hacker-dark text-xs pl-1">({getDomainFromUrl(url)})</span>
            </div>
            <div className={`flex flex-row pl-${index ? "8" : "4"}`}>
                <p className="text-hacker-dark text-xs">
                    {points} point{points > 1 && "s"} by <span>{author}</span>
                </p>
                <p className="text-hacker-dark text-xs pl-1">
                    <span>{formatTime()}</span> | <span>hide</span> | <span><Link to={`/story/${objectID || id}`}>{num_comments} comments</Link></span>
                </p>
            </div>
        </div>
     );
}
 
export default Story;