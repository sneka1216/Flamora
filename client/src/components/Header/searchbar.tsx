"use-client";
import React from "react";

const Searchbar = () => {
  const placeHolderText = "Search";
  return (
    <div className="w-64 relative h-10  flex items-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        aria-hidden="true"
        className="mr-8 absolute left-3 h-5 w-5 text-black"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
        ></path>
      </svg>
      <input
        type="text"
        className="pl-10 w-full h-full border outline-none border-black text-black"
        placeholder={placeHolderText}
      />
    </div>
  );
};

export default Searchbar;
