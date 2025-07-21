"use client";
import React from "react";
import Logo from "./logo";
import Searchbar from "./searchbar";
import NavItems from "./navItems";
import Link from "next/link";

const Header = () => {
  const logoText = "F l a m o r a";
  return (
    <div>
      <div className="grid grid-cols-6  pb-5">
        <div className="row-span-2 mt-5 col-span-2 place-content-center ml-10">
          <Searchbar />
        </div>
        <div className="col-span-2">
          <div className="ml-20">
            <div className="ml-23">
              <Logo />
            </div>
            <p className="text-3xl ml-10 font-extralight text-black">
              {logoText?.toUpperCase()}
            </p>
          </div>
        </div>
        <div className="row-span-2 mt-5 col-span-2 place-content-center ml-10">
          <div className="flex justify-center gap-8">
            <Link href={"/account/register"}>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
              >
                <g strokeWidth="0" />
                <g
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  stroke="black"
                  strokeWidth={1}
                />
                <g>
                  <path
                    d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z"
                    stroke="black"
                    strokeWidth={1}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M20.5899 22C20.5899 18.13 16.7399 15 11.9999 15C7.25991 15 3.40991 18.13 3.40991 22"
                    stroke="black"
                    strokeWidth={1}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </g>
              </svg>
            </Link>
            <Link href={"/wishlist"}>
              <svg
                viewBox="0 0 48 48"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                className="w-6 h-6"
              >
                <path
                  d="M43 17.0766c0-5.6539-4.5835-10.2373-10.2374-10.2373-3.7223 0-6.9708 1.9932-8.7626 4.964-1.7919-2.9708-5.0403-4.964-8.7626-4.964C9.5835 6.8393 5 11.4227 5 17.0766c0 1.2925.2496 2.524.6866 3.6627 3.3851 9.7368 18.3134 20.4215 18.3134 20.4215s14.9282-10.6847 18.3134-20.4215c.437-1.1386.6867-2.3702.6867-3.6627Z"
                  stroke="black"
                  strokeWidth={1.5} // <- Updated here
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
            <Link href={"/cart"}>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
              >
                <path
                  d="M6.29977 5H21L19 12H7.37671M20 16H8L6 3H3M9 20C9 20.5523 8.55228 21 8 21C7.44772 21 7 20.5523 7 20C7 19.4477 7.44772 19 8 19C8.55228 19 9 19.4477 9 20ZM20 20C20 20.5523 19.5523 21 19 21C18.4477 21 18 20.5523 18 20C18 19.4477 18.4477 19 19 19C19.5523 19 20 19.4477 20 20Z"
                  stroke="black"
                  strokeWidth={1}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>
      <NavItems />
    </div>
  );
};

export default Header;
