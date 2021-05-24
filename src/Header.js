import React, { Fragment } from 'react';
import { nanoid } from 'nanoid'

const links = [
    {
        to: "newest",
        text: "new"
    },
    {
        to: "front",
        text: "past"
    },
    {
        to: "newcomments",
        text: "comments"
    },
    {
        to: "ask",
        text: "ask"
    },
    {
        to: "show",
        text: "show"
    },
    {
        to: "jobs",
        text: "jobs"
    },
    {
        to: "submit",
        text: "submit"
    }
]

const Link = ({to, text}) => {
    return (
        <a href={to} className="hover:text-white">{text}</a>
    )
}

const Header = () => {
    return ( 
        <div className="w-full text-left bg-hacker p-2 flex flex-row sticky top-0">
            <div className="w-2/12">
            {/* 🐑⚡ */}
                <span className="text-white font-bold p-1 m-1 border-2">ES</span> 
                <strong>Hacker News</strong>
            </div>
            <div className="flex flex-row justify-between w-10/12">
                <div>
                {links.map((link, index, array) => {
                    return (<Fragment key={nanoid()}>
                    <Link  to={link.to} text={link.text} />
                    {index !== array.length - 1 && " | "}
                    </Fragment>)
                })}
                </div>
                <Link to="login" text="login" />
            </div>
        </div>
     );
}
 
export default Header;


              