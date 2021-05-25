import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { nanoid } from "nanoid";

const links = [
  {
    to: "newest",
    text: "new",
  },
  {
    to: "front",
    text: "past",
  },
  {
    to: "newcomments",
    text: "comments",
  },
  {
    to: "ask",
    text: "ask",
  },
  {
    to: "show",
    text: "show",
  },
  {
    to: "jobs",
    text: "jobs",
  },
  {
    to: "submit",
    text: "submit",
  },
];

const CustomLink = ({ to, text }) => {
  return (
    <Link to={`/${to}`} className="hover:text-hacker">
      {text}
    </Link>
  );
};

const Header = () => {
  return (
    <div className="w-full text-left bg-hacker-electric p-2 flex flex-row sticky top-0">
      <div className="w-2/12">
        {/* 🐑⚡ */}
        <span className="text-hacker font-bold p-1 m-1 ">
          <Link to="/">🐑⚡</Link>
        </span>
        <Link to="/">
          <strong>Electric Sheep News</strong>
        </Link>
      </div>
      <div className="flex flex-row justify-between w-10/12">
        <div>
          {links.map((link, index, array) => {
            return (
              <Fragment key={nanoid()}>
                <CustomLink to={link.to} text={link.text} />
                {index !== array.length - 1 && " | "}
              </Fragment>
            );
          })}
        </div>
        <CustomLink to="login" text="login" />
      </div>
    </div>
  );
};

export default Header;
