import React from "react";

const SearchFilter = ({ search, setSearch, isNews, setPage }) => {
  return (
    <div className="flex flex-row self-end pr-5">
      <p className=" pt-1 pb-1">
        {isNews
          ? "You are currently seeing news about:"
          : "You query did not return any result:"}{" "}
        <span className="font-bold">{search}</span>
      </p>
      <span
        role="img"
        aria-label="Delete filter"
        className="transition-opacity duration-300 text-xxs cursor-pointer self-center pl-1 pt-1 opacity-50 hover:opacity-100"
        onClick={() => {
          setSearch("");
          setPage(0);
        }}
      >
        ❌
      </span>
    </div>
  );
};

export default SearchFilter;
