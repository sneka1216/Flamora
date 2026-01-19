"use client";
import React, { useEffect, useState } from "react";
import Logo from "./logo";
import Searchbar from "./searchbar";
import NavItems from "./navItems";
import Link from "next/link";
import { getWithExpiry } from "@/utils/functions/account";
export type User = {
  _id: string;
  isGuest: boolean;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  __v: number;
  email: string;
  name: string;
  password: string;
};

export type StoredUser = {
  value: User;
  expiry: number; // timestamp (milliseconds)
};

const Header = () => {
  const logoText = "F l a m o r a";
  const [user, setUser] = useState<StoredUser | null>(null);

  useEffect(() => {
    const userData = getWithExpiry("user");
    setUser(userData);
  }, []);

  return (
    <div className="sticky top-0 bg-white z-50">
      <div className="flex s w-full flex-row items-center justify-center py-5 px-3">
        <div className="w-full">
          <Searchbar />
        </div>
        <div className="w-full flex flex-col items-center justify-center">
          <Logo />

          <p className="text-3xl  font-extralight text-black">
            {logoText?.toUpperCase()}
          </p>
        </div>
        <div className="w-full ">
          <div className="flex justify-center gap-8">
            <Link className=" relative " href={"/account/register"}>
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

              {user && user?.value?.isGuest ? (
                <p className="w-50 absolute top-7 left-[-24px]">HI, GUEST</p>
              ) : user && user?.value?.name ? (
                <p className="w-50 absolute top-7 left-[-24px]">
                  HI, {user?.value?.name?.toUpperCase()}
                </p>
              ) : null}
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
