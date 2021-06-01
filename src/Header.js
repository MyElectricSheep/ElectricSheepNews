import React, {
  // Fragment,
  useState,
} from "react";
import { Link } from "react-router-dom";
import {
  useHistory,
  useLocation,
  useParams,
  useRouteMatch,
} from "react-router-dom";
// import { nanoid } from "nanoid";

// const links = [
//   {
//     to: "newest",
//     text: "new",
//   },
//   {
//     to: "front",
//     text: "past",
//   },
//   {
//     to: "newcomments",
//     text: "comments",
//   },
//   {
//     to: "ask",
//     text: "ask",
//   },
//   {
//     to: "show",
//     text: "show",
//   },
//   {
//     to: "jobs",
//     text: "jobs",
//   },
//   {
//     to: "submit",
//     text: "submit",
//   },
// ];

// const CustomLink = ({ to, text }) => {
//   return (
//     <Link to={`/${to}`} className="hover:text-hacker">
//       {text}
//     </Link>
//   );
// };

const Header = ({ setSearch }) => {
  const history = useHistory();

  const [userInput, setUserInput] = useState("");

  const handleUserInput = (e) => {
    setUserInput(e.target.value);
  };

  const handleSetSearch = (e) => {
    if (e.key === "Enter" && userInput) {
      setSearch(userInput);
      setUserInput("");
      if (history?.location?.pathname.includes("/story")) {
        history.push("/");
      }
    }
  };

  return (
    <div className="flex flex-col w-full lg:text-left justify-center items-center lg:justify-between bg-hacker-electric p-2 lg:flex-row">
      {/* sticky top-0 */}
      <div className="lg:w-4/12">
        {/* 🐑⚡ */}
        <span className="text-hacker font-bold p-1 m-1 ">
          <Link to="/">🐑 ⚡</Link>
        </span>
        <Link to="/">
          <strong className="text-lg md:text-base ">Electric Sheep News</strong>
        </Link>
      </div>
      <div className="flex flex-row justify-between text-xs py-2 lg:py-0 lg:text-sm lg:w-5/12">
        {/* <div>
          {links.map((link, index, array) => {
            return (
              <Fragment key={nanoid()}>
                <CustomLink to={link.to} text={link.text} />
                {index !== array.length - 1 && " | "}
              </Fragment>
            );
          })}
        </div> */}
      </div>
      <div className="pr-2">
        <label
          htmlFor="id"
          className="text-hacker-dark text-xs xl:text-sm pr-2"
        >
          Search:
        </label>
        <input
          type="text"
          className="border py-0 px-0 text-sm rounded-sm text-center"
          autoComplete="off"
          value={userInput}
          onChange={handleUserInput}
          onKeyDown={handleSetSearch}
          placeholder="Enter a topic here"
          id="search"
        ></input>
      </div>
    </div>
  );
};

export default Header;
