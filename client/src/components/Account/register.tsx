"use client";

import React, { useEffect, useState, useTransition } from "react";
import registerMockup from "../../mockupData/account.json";
import { useRouter } from "next/navigation";
import Link from "next/link";
import GustUserConsent from "./GustUserConsent";
import useAccount from "@/utils/hooks/useAccount";
import { getWithExpiry } from "@/utils/functions/account";

export type User = {
  _id: string;
  isGuest: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
  email: string;
  name: string;
  password: string;
};

export type StoredUser = {
  value: User;
  expiry: number;
};

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [guest, setGuest] = useState(false);
  const [user, setUser] = useState<StoredUser | null>(null);
  const { updateAccount } = useAccount();
  const [isPending, startTransition] = useTransition();
  const [responseMsg, setResponseMsg] = useState("");
  const router = useRouter();

  useEffect(() => {
    const userData = getWithExpiry("user");
    console.log("userData", userData);
    setUser(userData);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    startTransition(async () => {
      try {
        // update existing guest → full user
        if (user) {
          const updatedUser = await updateAccount({
            ...formData,
            isGuest: false,
            _id: user?.value?._id,
          });

          if (updatedUser) {
            router.push("/account/login");
            return;
          }
        }

        // otherwise create new user
        const res = await fetch(
          "https://flamora.onrender.com/customer/signup",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
          },
        );

        const data = await res.json();

        if (res.ok) {
          router.push("/account/login");
          setResponseMsg("Registration successful!");
        } else {
          setResponseMsg(data?.message || "Registration failed.");
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
        className="flex flex-col items-center justify-center my-5 relative"
      >
        {!user && <GustUserConsent guest={guest} setGuest={setGuest} />}
        <p className="text-sm text-center mt-5 ">
          ALREADY HAVE AN ACCOUNT{" "}
          <span className="underline">
            <Link href={"/account/login"}>LOGIN</Link>
          </span>
        </p>
        <p className="text-[35px] my-5">Register</p>

        {registerMockup?.register?.map((field: string) => {
          const fieldKey = field.toLowerCase();

          return (
            <input
              key={fieldKey}
              name={fieldKey}
              placeholder={field}
              className="w-80 h-9 my-2 px-2 border outline-none text-sm border-black"
              value={formData[fieldKey as keyof typeof formData] || ""}
              onChange={handleChange}
              required
            />
          );
        })}

        <input
          type="submit"
          className={`w-80 h-9 bg-black text-sm text-white my-2 ${
            isPending && "opacity-50 cursor-not-allowed"
          }`}
          value={isPending ? "Submitting..." : "Sign In"}
          disabled={isPending}
        />

        {responseMsg && (
          <p className="text-sm text-center text-red-600 mt-2">{responseMsg}</p>
        )}
      </form>
    </>
  );
};

export default Register;
