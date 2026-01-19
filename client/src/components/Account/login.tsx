"use client";

import React, { useState, useTransition } from "react";
import LoginMockUpData from "../../mockupData/account.json";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [isPending, startTransition] = useTransition();
  const [responseMsg, setResponseMsg] = useState("");
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(async () => {
      try {
        const res = await fetch("https://flamora.onrender.com/customer/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        const data = await res?.json();

        if (res?.ok) {
          router.push("/");
          setResponseMsg("Login successful!");
        } else {
          setResponseMsg(data?.message || "Login failed.");
        }
      } catch (error) {
        setResponseMsg("Something went wrong!");
        console.error(error);
      }
    });
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-center my-5 items-center relative"
      >
        <p className="text-sm text-center mt-5 ">
          DON'T HAVE AN ACCOUNT{" "}
          <span className="underline">
            <Link href={"/account/register"}>REGISTER</Link>
          </span>
        </p>
        <p className="text-[35px] my-5">Login</p>
        {LoginMockUpData?.login?.map((field: string) => {
          return (
            <input
              type="text"
              key={field}
              name={field.toLocaleLowerCase()}
              placeholder={field}
              onChange={handleChange}
              className="w-80 h-9 my-2 px-2 border outline-none text-sm border-black"
            />
          );
        })}

        <input
          type="submit"
          className={`w-80 h-9 bg-black text-sm text-white my-2 ${
            isPending && "opacity-50 cursor-not-allowed"
          }`}
          value={isPending ? "Submitting..." : "Login In"}
          disabled={isPending}
        />

        {responseMsg && (
          <p className="text-sm text-center text-red-600 mt-2">{responseMsg}</p>
        )}
      </form>
    </>
  );
};

export default Login;
